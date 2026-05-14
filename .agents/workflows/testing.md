# Workflow: Testing

## Description
Expert in writing and maintaining tests across the full stack. Follow this workflow when writing unit tests, integration tests, or end-to-end tests using Vitest, React Testing Library, Supertest, and Playwright.

## When to Use
- Writing tests for new features
- Adding tests during bug fixes
- Improving test coverage
- Setting up test infrastructure

## Steps

### 1. Determine Test Strategy
- [ ] Unit tests: Test individual functions and utilities
- [ ] Component tests: Test rendering and user interactions (React Testing Library)
- [ ] API tests: Test HTTP endpoints end-to-end (Supertest)
- [ ] E2E tests: Test critical user flows across the full stack (Playwright)

### 2. Write Unit Tests (Vitest)
- [ ] Test pure functions and business logic
- [ ] Mock external dependencies
- [ ] Follow Arrange-Act-Assert pattern
- [ ] Location: co-located `*.test.ts` files or `tests/backend/`

### 3. Write Component Tests (React Testing Library)
- [ ] Test by behavior, not implementation details
- [ ] Use `screen.getByRole()` for queries
- [ ] Verify user interactions and rendering
- [ ] Location: `tests/frontend/` or co-located `*.test.tsx`

### 4. Write API Tests (Supertest)
- [ ] Test HTTP endpoints end-to-end
- [ ] Verify status codes, response shape, and side effects
- [ ] Use test database, not production
- [ ] Location: `tests/backend/`

### 5. Write E2E Tests (Playwright)
- [ ] Test critical user flows across the full stack
- [ ] Run against staging environment
- [ ] Cover happy path and key edge cases
- [ ] Location: `tests/e2e/`

### 6. Follow Guidelines
- [ ] Descriptive it blocks: `should [expected] when [condition]`
- [ ] Use factories or fixtures for test data
- [ ] Never hardcode test data inline when reusable
- [ ] Clean up test data after each test
- [ ] Use separate test database

### 7. Verify Coverage
- [ ] Unit tests: > 80% line coverage
- [ ] API tests: all endpoints covered
- [ ] E2E tests: critical user journeys
- [ ] Do not chase 100% coverage at the expense of meaningful tests

## Output Expectations
- Tests that are readable and maintainable
- Clear test descriptions that document behavior
- Proper mocking and isolation
- Fast, deterministic test execution
