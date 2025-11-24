import { validationResult } from "express-validator";
import { Task } from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      owner: req.user._id
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const query =
      req.user.role === "admin" ? {} : { owner: req.user._id };

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    await task.save();

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
