# Agent System Prompt

You are an AI agent working on this project. This document is your primary reference. Always read this file first when starting work, then load additional resources as needed.

## Project Context

- **Project Overview**: [README.md](./README.md)
- **Frontend Documentation**: [frontend/README.md](./frontend/README.md)
- **Backend Documentation**: [backend/README.md](./backend/README.md)

## Agent Resources

### Skills
Load the relevant skill when performing specialized tasks:

- **Frontend Development**: [`.agents/skills/frontend-development.md`](./.agents/skills/frontend-development.md) — React, TypeScript, Vite, TailwindCSS
- **Backend Development**: [`.agents/skills/backend-development.md`](./.agents/skills/backend-development.md) — Node.js, Express, TypeScript, Prisma
- **Testing**: [`.agents/skills/testing.md`](./.agents/skills/testing.md) — Vitest, React Testing Library, Supertest, Playwright
- **Database Migration**: [`.agents/skills/database-migration.md`](./.agents/skills/database-migration.md) — Prisma Migrate, schema changes

### Tools
Use the relevant tool when performing operational tasks:

- **API Generator**: [`.agents/tools/api-generator.md`](./.agents/tools/api-generator.md) — Scaffold new REST API endpoints
- **Database Migrator**: [`.agents/tools/db-migrator.md`](./.agents/tools/db-migrator.md) — Manage schema and data migrations
- **Test Runner**: [`.agents/tools/test-runner.md`](./.agents/tools/test-runner.md) — Run test suites across all layers

### Workflows
Follow the relevant workflow for structured processes:

- **Feature Development**: [`.agents/workflows/feature-development.md`](./.agents/workflows/feature-development.md) — End-to-end feature implementation
- **Bug Fix**: [`.agents/workflows/bug-fix.md`](./.agents/workflows/bug-fix.md) — Diagnose, fix, and verify bug fixes
- **Release**: [`.agents/workflows/release.md`](./.agents/workflows/release.md) — Versioning, building, and deploying

## Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript 5 (strict mode) |
| Styling | TailwindCSS 3 |
| State Management | Zustand |
| HTTP Client | Axios |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ |
| Framework | Express 4 |
| Language | TypeScript 5 (strict mode) |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Validation | Zod |
| Auth | JWT + bcrypt |
| Testing | Vitest + Supertest |
| Linting | ESLint + Prettier |

### Infrastructure
| Layer | Technology |
|-------|-----------|
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Package Manager | npm (workspaces) |

## Code Style & Conventions

### General Rules
- **TypeScript strict mode** is enabled everywhere. No `any` types allowed.
- **ESLint + Prettier** must pass before committing. Run `npm run lint` and `npm run typecheck`.
- **No console.log** in production code. Use a proper logger.
- **No dead code**. Remove unused imports, variables, and functions.
- **Meaningful names**. Variables, functions, and files must be self-descriptive.

### TypeScript
- Use `interface` for object shapes that will be extended or implemented
- Use `type` for unions, intersections, and utility types
- Prefer `as const` for literal types over type assertions
- Use optional chaining `?.` and nullish coalescing `??` over `&&` and `||`
- Export types alongside implementations

### Frontend Conventions
- Functional components only. No class components.
- Co-locate component, styles, and test files
- Use custom hooks for reusable logic (prefix with `use`)
- All props must be typed with interfaces
- Use TailwindCSS utility classes; no CSS modules or styled-components
- Use `clsx` or `cn` utility for conditional class names
- Handle loading, error, and empty states in every data-fetching component
- Use semantic HTML elements (`<main>`, `<section>`, `<article>`, etc.)
- Ensure accessibility: ARIA labels, keyboard navigation, focus management

### Backend Conventions
- Follow Controller → Service → Model architecture
- Controllers: thin, handle HTTP request/response only
- Services: contain all business logic
- All routes prefixed with `/api/v1/`
- Consistent response format: `{ success: boolean, data?: T, error?: string }`
- Validate all inputs with Zod schemas before processing
- Use custom error classes for domain-specific errors
- Centralized error handling via Express error middleware
- Never expose stack traces or internal errors to clients
- Use environment variables for configuration (never hardcode secrets)

### Testing Conventions
- Follow Arrange-Act-Assert pattern
- Test behavior, not implementation details
- Descriptive test names: `should [expected] when [condition]`
- Mock external dependencies (DB, HTTP, file system)
- Target >80% line coverage for unit tests
- E2E tests cover critical user journeys only

### Git Conventions
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- One logical change per commit
- Commit messages in present tense imperative: "add user endpoint" not "added"
- Create feature branches from `main`: `feat/feature-name`, `fix/bug-name`

## Project Structure

```
.
├── .agents/           # Agent skills, tools, and workflows
├── frontend/          # React frontend (Vite + TypeScript)
├── backend/           # Express backend (TypeScript + Prisma)
├── tests/             # Test suites (unit, component, e2e)
├── docker/            # Docker configurations
└── .github/workflows/ # CI/CD pipelines
```

## Quick Commands

```bash
# Install all dependencies
npm install

# Development
npm run dev            # Start frontend + backend concurrently

# Frontend
cd frontend && npm run dev
cd frontend && npm run build

# Backend
cd backend && npm run dev
cd backend && npm run build

# Database
cd backend && npx prisma migrate dev
cd backend && npx prisma generate

# Testing
npm run test           # All tests
npm run test:unit      # Unit tests
npm run test:e2e       # E2E tests
npm run test:coverage  # Coverage report

# Quality
npm run lint           # ESLint
npm run typecheck      # TypeScript type check
npm run format         # Prettier

# Docker
docker compose up -d   # Start all services
docker compose down    # Stop all services
```
