# Scalable API Backend (Node.js + Express + MongoDB)

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

- Base URL: `http://localhost:5000/api/v1`
- Swagger docs: `http://localhost:5000/api-docs`

## Core Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Scalability Notes

- **Modular structure**: auth and tasks are separate modules; new modules (e.g., projects, comments) can be added under `routes/`, `controllers/`, and `models/`.
- **Horizontal scaling**: Stateless REST API with JWT allows scaling behind a load balancer since session state is not stored in memory.
- **Database**: MongoDB can be scaled using replica sets for high availability and sharding for large datasets.
- **Caching**: Frequently accessed read endpoints (e.g., `GET /tasks`) can be cached using Redis.
- **Logging**: Using `morgan` now; can be extended with Winston + centralized logging (ELK stack) for production.
- **Microservices**: In future, auth can be split into a dedicated service issuing tokens; tasks service can focus on task domain, communicating via REST or message queues.
