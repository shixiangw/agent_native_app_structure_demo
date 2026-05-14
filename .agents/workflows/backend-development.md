# Workflow: Backend Development

## Description
Expert in Node.js + Express + TypeScript + Prisma backend development. Follow this workflow when building API endpoints, business logic, database operations, or middleware.

## When to Use
- Creating new API endpoints
- Implementing business logic services
- Database schema design and migrations
- Adding authentication/authorization
- Building middleware

## Steps

### 1. Design the API Contract
- [ ] Define RESTful resource naming (plural nouns: `/users`, `/posts`)
- [ ] Determine proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- [ ] Design consistent response format: `{ success, data, error }`
- [ ] Use appropriate status codes (200, 201, 400, 401, 403, 404, 500)
- [ ] Version APIs via path prefix: `/api/v1/`

### 2. Implement Controller Layer (Thin)
- [ ] Handle HTTP request/response only
- [ ] Delegate logic to services
- [ ] Validate inputs with Zod schemas

### 3. Implement Service Layer (Business Logic)
- [ ] Contain all business logic here
- [ ] Use custom error classes extending `Error`
- [ ] Never expose stack traces or internal details to clients
- [ ] Log errors with context for debugging

### 4. Implement Data Access (Prisma)
- [ ] Define models in `schema.prisma` with clear relations
- [ ] Use transactions for multi-step operations
- [ ] Add indexes on frequently queried fields
- [ ] Never use raw SQL unless absolutely necessary
- [ ] Run `prisma generate` after schema changes

### 5. Add Security
- [ ] Validate all inputs with Zod schemas
- [ ] Use parameterized queries (Prisma handles this)
- [ ] Implement rate limiting on sensitive endpoints
- [ ] Use helmet, cors, and express-rate-limit middleware
- [ ] Hash passwords with bcrypt, use JWT for auth

### 6. Ensure Code Quality
- [ ] Controllers: `camelCase.controller.ts`
- [ ] Services: `camelCase.service.ts`
- [ ] Routes: `camelCase.routes.ts`
- [ ] Models: `PascalCase.ts` (Prisma models)
- [ ] Centralized error handling via middleware

## Output Expectations
- Type-safe TypeScript throughout
- Comprehensive input validation
- Proper error handling at every layer
- Database queries optimized with proper selects
