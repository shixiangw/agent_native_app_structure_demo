# Agent Native App Structure Demo

A full-stack TypeScript application demonstrating an agent-native project structure. Designed for AI agents to understand, navigate, and modify the codebase efficiently.

## Overview

This project serves as a reference implementation for structuring applications that are optimized for both human developers and AI agents. The key differentiator is the `.agents/` directory and `AGENTS.md` file, which provide structured context that AI agents can load on demand.

## Key Features

- **Agent-Native Structure**: `.agents/` directory with skills, tools, and workflows
- **Full-Stack TypeScript**: React frontend + Express backend with strict TypeScript
- **REST API**: Well-structured API with validation, error handling, and type safety
- **Database**: PostgreSQL with Prisma ORM and migration support
- **Testing**: Multi-layer testing (unit, component, API, E2E)
- **Docker**: Containerized development and deployment
- **CI/CD**: Automated testing and deployment via GitHub Actions

## Project Structure

```
.
├── .agents/                    # Agent knowledge base
│   ├── skills/                 # Specialized capabilities
│   ├── tools/                  # Operational tools
│   └── workflows/              # Structured processes
├── AGENTS.md                   # Agent system prompt (entry point)
├── frontend/                   # React + Vite + TypeScript
├── backend/                    # Express + TypeScript + Prisma
├── tests/                      # Test suites
├── docker/                     # Docker configurations
└── .github/workflows/          # CI/CD pipelines
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or use Docker)
- Docker & Docker Compose (optional)

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Start database (via Docker)
docker compose up -d db

# Run database migrations
cd backend && npx prisma migrate dev

# Start development servers
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api/v1/health

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, TypeScript, TailwindCSS, Zustand |
| Backend | Node.js, Express 4, TypeScript, Prisma 5 |
| Database | PostgreSQL 16 |
| Testing | Vitest, React Testing Library, Supertest, Playwright |
| DevOps | Docker, GitHub Actions |

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## For AI Agents

If you are an AI agent working on this project, start by reading `AGENTS.md`. It contains all the context you need including code conventions, tech stack details, and links to skills, tools, and workflows.

## License

MIT
