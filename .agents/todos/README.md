# Project TODO — Agent Native App Structure Demo

> Generated: 2026-05-11 | Demo project: Full-stack TypeScript app (React + Express + Prisma + PostgreSQL)

## Completed

- [x] **Express Server Setup** — TypeScript strict mode, middleware chain (helmet, cors, rate-limit), error handling middleware, 404 handler
- [x] **User CRUD API** — Controller → Service → Model pattern, in-memory store with Prisma schema ready
- [x] **Input Validation** — Zod schemas for create/update/id params, validation middleware
- [x] **Consistent Response Format** — `{ success: boolean, data?, error? }` across all endpoints
- [x] **Health Check Endpoint** — `GET /api/v1/health` with status, timestamp, uptime
- [x] **Password Hashing** — bcrypt with salt rounds
- [x] **Auth Middleware (placeholder)** — Bearer token extraction, 401 error handling
- [x] **React + Vite Scaffold** — TypeScript strict mode, TailwindCSS 3, Zustand store
- [x] **Axios API Client** — Base URL config, error interceptor
- [x] **Home Page** — Minimal landing page with API health check link
- [x] **Docker Compose** — PostgreSQL service configuration
- [x] **Multi-Layer Test Setup** — Vitest, React Testing Library, Supertest, Playwright
- [x] **Agent-Native Project Structure** — `.agents/` directory with skills, tools, workflows
- [x] **AGENTS.md** — Complete agent system prompt with conventions, commands, tech stack

## P1 — Core Features

- [ ] **JWT Authentication** — login endpoint, token verify in auth middleware, protected routes. See [api-auth-enhancement-todo.md](./api-auth-enhancement-todo.md)
- [ ] **User Routes Registration** — Register user routes in `backend/src/index.ts`
- [ ] **User Registration UI** — Register form with validation and error handling

## P2 — Enhanced Features

- [ ] **API Documentation** — Swagger/OpenAPI auto-generation, Swagger UI endpoint. See [api-docs-todo.md](./api-docs-todo.md)
- [ ] **Prisma Database Integration** — Replace in-memory store with Prisma client, run migrations
- [ ] **Frontend User Management** — List, create, edit, delete users with loading/error/empty states

## P3 — Production Hardening

- [ ] **Graceful Shutdown** — Close DB connections on SIGTERM/SIGINT
- [ ] **Config Validation** — Validate required env vars on startup
- [ ] **Request Logging** — Morgan or custom request logger middleware
- [ ] **Configurable CORS Origins** — Support `CORS_ORIGINS` env var
- [ ] **Password Strength Validation** — Minimum length, complexity rules in Zod

## P4 — Documentation & Polish

- [ ] **E2E Tests** — Critical user journeys (register → login → CRUD)
- [ ] **Edge Case Handling** — Loading skeletons, empty states, error boundaries
- [ ] **Accessibility Audit** — ARIA labels, keyboard nav, focus management
- [ ] **Contributing Guide** — Setup, conventions, review process
