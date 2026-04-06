# Backend

Node.js + Express 4 + TypeScript + Prisma backend API.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express 4
- **Language**: TypeScript 5 (strict mode)
- **ORM**: Prisma 5
- **Database**: PostgreSQL 16
- **Validation**: Zod
- **Auth**: JWT + bcrypt
- **Testing**: Vitest + Supertest
- **Linting**: ESLint + Prettier

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # HTTP request/response handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data access layer (Prisma)
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── index.ts        # Entry point
├── prisma/
│   └── schema.prisma   # Database schema
├── package.json
└── tsconfig.json
```

## Architecture

Follows **Controller → Service → Model** pattern:

- **Controllers**: Thin layer handling HTTP request/response only
- **Services**: Contains all business logic
- **Models**: Data access via Prisma ORM

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start PostgreSQL (via Docker)
docker compose up -d db

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev

# Build for production
npm run build
```

## API Design

### Response Format
All endpoints return consistent JSON:
```json
{
  "success": true,
  "data": { ... }
}
```

Error response:
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Route Convention
- All routes prefixed with `/api/v1/`
- RESTful resource naming (plural nouns)
- Proper HTTP methods and status codes

### Example Endpoints
- `GET    /api/v1/health`       - Health check
- `GET    /api/v1/users`        - List users
- `GET    /api/v1/users/:id`    - Get user
- `POST   /api/v1/users`        - Create user
- `PUT    /api/v1/users/:id`    - Update user
- `DELETE /api/v1/users/:id`    - Delete user

## Development Guidelines

### Input Validation
- Validate all inputs with Zod schemas
- Define schemas in `types/` alongside type definitions

### Error Handling
- Use custom error classes
- Centralized error middleware
- Never expose stack traces to clients

### Security
- Use environment variables for secrets
- Hash passwords with bcrypt
- JWT for authentication
- Rate limiting on sensitive endpoints

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run production build |
| `npm run test` | Run Vitest tests |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |
| `npm run format` | Prettier formatting |
| `npx prisma migrate dev` | Run pending migrations |
| `npx prisma generate` | Regenerate Prisma Client |
| `npx prisma studio` | Open Prisma Studio UI |
