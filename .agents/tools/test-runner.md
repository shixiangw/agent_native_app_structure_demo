# Tool: Test Runner

## Description
Runs the appropriate test suite for the project. Supports unit tests, component tests, API tests, and E2E tests with proper configuration and reporting.

## Usage

### Run All Tests
```bash
npm run test
```

### Run by Type

#### Unit Tests (Backend)
```bash
npm run test:unit
# Runs: vitest tests/backend/
```

#### Component Tests (Frontend)
```bash
npm run test:component
# Runs: vitest tests/frontend/
```

#### API Tests
```bash
npm run test:api
# Runs: vitest tests/backend/api/
```

#### E2E Tests
```bash
npm run test:e2e
# Runs: playwright test tests/e2e/
```

### Run Specific Test File
```bash
npm run test:unit -- user.service.test.ts
npm run test:e2e -- --grep "login"
```

### Watch Mode
```bash
npm run test:unit -- --watch
npm run test:component -- --watch
```

### Coverage Report
```bash
npm run test:coverage
# Generates coverage report in coverage/
# Targets: >80% line coverage
```

### CI Mode
```bash
npm run test:ci
# Runs all tests with --run flag (no watch)
# Exits with error code if any test fails
# Generates JUnit XML report
```

## Troubleshooting

### Tests Failing Due to Database
```bash
# Reset test database
npx prisma migrate reset --force
npx prisma db push
```

### Tests Failing Due to Port Conflicts
```bash
# Ensure no other process is using test ports
lsof -ti:3001 | xargs kill  # backend test port
```

### Slow E2E Tests
```bash
# Run with headed mode for debugging
npm run test:e2e -- --headed
# Run specific browser
npm run test:e2e -- --project=chromium
```
