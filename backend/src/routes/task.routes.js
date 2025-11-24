import express from "express";
import { body } from "express-validator";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [body("title").notEmpty().withMessage("Title is required")],
  createTask
);

router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
