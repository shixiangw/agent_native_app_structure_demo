# Skill: Testing

## Description
Expert in writing and maintaining tests across the full stack. Covers unit tests, integration tests, and end-to-end tests using Vitest, React Testing Library, Supertest, and Playwright.

## When to Use
- Writing tests for new features
- Adding tests during bug fixes
- Improving test coverage
- Setting up test infrastructure

## Testing Strategy

### Unit Tests (Vitest)
- Test individual functions and utilities
- Mock external dependencies
- Focus on pure functions and business logic
- Location: co-located `*.test.ts` files or `tests/backend/`

### Component Tests (React Testing Library)
- Test component rendering and user interactions
- Test by behavior, not implementation details
- Use `screen.getByRole()` for queries
- Location: `tests/frontend/` or co-located `*.test.tsx`

### API Tests (Supertest)
- Test HTTP endpoints end-to-end
- Verify status codes, response shape, and side effects
- Use test database, not production
- Location: `tests/backend/`

### E2E Tests (Playwright)
- Test critical user flows across the full stack
- Run against staging environment
- Cover happy path and key edge cases
- Location: `tests/e2e/`

## Guidelines

### Test Structure (Arrange-Act-Assert)
```typescript
describe('FeatureName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = { ... };

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toEqual(expected);
  });
});
```

### Naming Conventions
- Describe blocks: feature or unit being tested
- It blocks: `should [expected behavior] when [condition]`
- Example: `should return 404 when user not found`

### Coverage Targets
- Unit tests: > 80% line coverage
- API tests: all endpoints covered
- E2E tests: critical user journeys
- Do not chase 100% coverage at the expense of meaningful tests

### Test Data
- Use factories or fixtures for test data
- Never hardcode test data inline when reusable
- Clean up test data after each test
- Use separate test database

## Output Expectations
- Tests that are readable and maintainable
- Clear test descriptions that document behavior
- Proper mocking and isolation
- Fast, deterministic test execution
