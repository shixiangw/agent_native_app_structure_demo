# Tool: API Generator

## Description
Generates boilerplate code for new REST API endpoints including controller, service, route, and type definitions. Follows the project's established patterns.

## Usage
When creating a new API resource, this tool generates the complete scaffold:

### Input Required
- Resource name (singular, e.g., `user`, `product`, `comment`)
- Fields with types (e.g., `name: string`, `age: number`, `isActive: boolean`)
- Whether authentication is required (default: true)

### Generated Files
```
backend/src/
├── controllers/{resource}.controller.ts
├── services/{resource}.service.ts
├── routes/{resource}.routes.ts
└── types/{resource}.types.ts
```

### Generated Endpoints
- `GET    /api/v1/{resources}`      - List all (with pagination)
- `GET    /api/v1/{resources}/:id`  - Get one by ID
- `POST   /api/v1/{resources}`      - Create new
- `PUT    /api/v1/{resources}/:id`  - Update full resource
- `PATCH  /api/v1/{resources}/:id`  - Partial update
- `DELETE /api/v1/{resources}/:id`  - Delete resource

### Example
```
Resource: task
Fields: title: string, description: string, completed: boolean, dueDate: Date
Auth: true
```

Generates full CRUD for tasks with Zod validation, error handling, and TypeScript types.

## Post-Generation Steps
1. Review generated files and adjust business logic
2. Add Prisma model to `schema.prisma` if new resource
3. Run `npx prisma migrate dev` for database changes
4. Write tests for new endpoints
5. Register routes in `backend/src/index.ts`
