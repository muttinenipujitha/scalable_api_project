# Backend Developer Intern Assignment

This repo contains:

- `backend/` – Node.js + Express + MongoDB REST API with JWT auth and role-based access control.
- `frontend/` – React + Vite app to register/login and perform CRUD on tasks.

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the URL shown by Vite (`http://localhost:5173`).

Use the UI to:

- Register a user
- Log in
- Create, edit, delete tasks (protected by JWT)
