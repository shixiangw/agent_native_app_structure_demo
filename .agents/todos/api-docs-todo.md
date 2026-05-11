# API Documentation — Task Tracking

> **Created**: 2026-05-11 | **Priority**: P2 | **Status**: 🔲 Pending

## Background

The project currently has **no API documentation**. While the backend follows consistent patterns (all routes prefixed `/api/v1/`, uniform response format `{ success, data, error }`), there is no generated OpenAPI spec or interactive documentation UI. Developers must read source code to understand endpoints, request shapes, and response types.

## Goal

Set up automatic OpenAPI/Swagger documentation generation so that every endpoint is self-documenting, with interactive exploration via Swagger UI.

## Option A — swagger-jsdoc + swagger-ui-express (Recommended)

Use JSDoc annotations in route files to generate OpenAPI spec, served via Swagger UI.

**Flow**:
```
Route files with JSDoc @openapi annotations
     │
     │ swagger-jsdoc parses annotations → OpenAPI JSON
     ▼
swagger-ui-express serves at /api/v1/docs
```

**Pros**:
- Annotations live next to route definitions (easy to keep in sync)
- Zero additional build step — runtime generation
- Well-established, large community
- Supports OpenAPI 3.0

**Cons**:
- JSDoc annotations can be verbose
- No TypeScript type → OpenAPI auto-conversion
- Manual maintenance of request/response schemas

---

## Option B — tsoa (TypeScript-first OpenAPI)

Use `tsoa` to generate OpenAPI spec from TypeScript types and decorators.

**Flow**:
```
TypeScript controllers with @Route, @Get, @Body decorators
     │
     │ tsoa build step → generates routes + OpenAPI spec
     ▼
Serves OpenAPI JSON + Swagger UI
```

**Pros**:
- TypeScript types are the single source of truth
- Generates both routes and spec automatically
- Better type safety

**Cons**:
- Requires build step (`tsoa spec-and-routes`)
- Decorator-based, changes coding pattern
- Less flexible for Express middleware chains
- Additional complexity for a demo project

---

## Option C — Manual openapi.json

Write and maintain a static `openapi.json` file.

**Pros**:
- Full control over spec content
- No dependencies
- Can be hand-crafted for demos

**Cons**:
- Must be manually updated on every API change
- Easy to drift out of sync with actual implementation
- Not practical beyond minimal endpoints

---

## Tasks

- [ ] **Evaluate and decide approach** (recommend Option A)
- [ ] **Install dependencies**
  - [ ] `npm install swagger-jsdoc swagger-ui-express`
  - [ ] `npm install -D @types/swagger-jsdoc @types/swagger-ui-express`
- [ ] **Create OpenAPI config** at `backend/src/config/swagger.ts`
  - [ ] Set info: title, version, description
  - [ ] Configure servers: `http://localhost:3000/api/v1`
  - [ ] Add security scheme: Bearer JWT
- [ ] **Add JSDoc annotations to existing routes**
  - [ ] `health.routes.ts` — GET /api/v1/health
  - [ ] `user.routes.ts` — all 5 CRUD endpoints
  - [ ] Auth login (when implemented)
- [ ] **Serve Swagger UI** at `GET /api/v1/docs`
  - [ ] Register route in `backend/src/index.ts`
- [ ] **Add test** verifying Swagger UI returns 200
- [ ] **Update frontend** — add API docs link to HomePage
