# Skill: Backend Development

## Description
Expert in Node.js + Express + TypeScript + Prisma backend development. Use this skill when building API endpoints, business logic, database operations, or middleware.

## When to Use
- Creating new API endpoints
- Implementing business logic services
- Database schema design and migrations
- Adding authentication/authorization
- Building middleware

## Guidelines

### Architecture
- Follow Controller → Service → Model pattern
- Controllers handle HTTP layer (request/response)
- Services contain business logic
- Models define data access layer (Prisma)
- Keep each layer thin and focused

### API Design
- RESTful resource naming (plural nouns: `/users`, `/posts`)
- Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Consistent response format: `{ success, data, error }`
- Use appropriate status codes (200, 201, 400, 401, 403, 404, 500)
- Version APIs via path prefix: `/api/v1/`

### Error Handling
- Use custom error classes extending `Error`
- Centralized error handling via middleware
- Never expose stack traces or internal details to clients
- Log errors with context for debugging

### Database (Prisma)
- Define models in `schema.prisma` with clear relations
- Use transactions for multi-step operations
- Add indexes on frequently queried fields
- Never use raw SQL unless absolutely necessary
- Run `prisma generate` after schema changes

### Security
- Validate all inputs with Zod schemas
- Use parameterized queries (Prisma handles this)
- Implement rate limiting on sensitive endpoints
- Use helmet, cors, and express-rate-limit middleware
- Hash passwords with bcrypt, use JWT for auth

### File Naming
- Controllers: `camelCase.controller.ts`
- Services: `camelCase.service.ts`
- Routes: `camelCase.routes.ts`
- Models: `PascalCase.ts` (Prisma models)

## Output Expectations
- Type-safe TypeScript throughout
- Comprehensive input validation
- Proper error handling at every layer
- Database queries optimized with proper selects
