# Workflow: Feature Development

## Description
End-to-end workflow for developing a new feature from requirement to merged code. Ensures consistency, quality, and test coverage.

## Steps

### 1. Understand Requirements
- [ ] Read the feature specification or issue description
- [ ] Clarify ambiguous requirements with the user
- [ ] Identify affected components (frontend, backend, or both)
- [ ] Determine if database schema changes are needed

### 2. Plan Implementation
- [ ] Break feature into small, testable increments
- [ ] Identify which files need to be created or modified
- [ ] Determine API contract (request/response shapes)
- [ ] Plan database changes if any

### 3. Backend First (API-First Approach)
- [ ] Update Prisma schema if new models/fields needed
  - Load skill: [Database Migration](../skills/database-migration.md)
  - Use tool: [Database Migrator](../tools/db-migrator.md)
- [ ] Create or update types in `backend/src/types/`
- [ ] Implement service layer with business logic
  - Load skill: [Backend Development](../skills/backend-development.md)
- [ ] Implement controller layer
- [ ] Register routes
- [ ] Write API tests
  - Load skill: [Testing](../skills/testing.md)
  - Use tool: [Test Runner](../tools/test-runner.md)

### 4. Frontend Implementation
- [ ] Define TypeScript types in `frontend/src/types/`
  - Load skill: [Frontend Development](../skills/frontend-development.md)
- [ ] Create or update API service functions in `frontend/src/services/`
- [ ] Build UI components
- [ ] Connect to state management (Zustand)
- [ ] Add loading, error, and empty states
- [ ] Write component tests

### 5. Testing
- [ ] Run full test suite
  - Use tool: [Test Runner](../tools/test-runner.md)
- [ ] Fix any failing tests
- [ ] Verify new tests pass
- [ ] Check coverage meets targets (>80%)

### 6. Code Quality
- [ ] Run linter: `npm run lint`
- [ ] Run type check: `npm run typecheck`
- [ ] Ensure no `any` types
- [ ] Verify consistent code style

### 7. Documentation
- [ ] Update `README.md` if feature changes user-facing behavior
- [ ] Update `frontend/README.md` or `backend/README.md` if applicable
- [ ] Add inline comments for complex logic only

### 8. Final Review
- [ ] All tests passing
- [ ] No lint or type errors
- [ ] Feature works end-to-end
- [ ] Code follows project conventions

## Output
- Feature branch with all changes
- Passing test suite
- Updated documentation if needed
