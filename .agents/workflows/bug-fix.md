# Workflow: Bug Fix

## Description
Systematic workflow for diagnosing, fixing, and verifying bug fixes. Ensures root cause is addressed and regression tests are added.

## Steps

### 1. Reproduce the Bug
- [ ] Read the bug report or error description
- [ ] Reproduce the issue locally
- [ ] Identify the exact error message and stack trace
- [ ] Note the conditions that trigger the bug

### 2. Diagnose Root Cause
- [ ] Trace the error to its source file and line
- [ ] Understand why the bug occurs (not just where)
- [ ] Check if it's a frontend, backend, or data issue
- [ ] Identify any related code that might have similar issues

### 3. Write a Failing Test First
- [ ] Write a test that reproduces the bug
  - Load skill: [Testing](../skills/testing.md)
  - Use tool: [Test Runner](../tools/test-runner.md)
- [ ] Confirm the test fails with current code
- [ ] This test will verify the fix works

### 4. Implement the Fix
- [ ] Make the minimal change to fix the bug
- [ ] Do not refactor unrelated code in the same commit
- [ ] Follow project conventions:
  - Load skill: [Frontend Development](../skills/frontend-development.md) (if frontend)
  - Load skill: [Backend Development](../skills/backend-development.md) (if backend)

### 5. Verify the Fix
- [ ] Confirm the new test passes
- [ ] Run full test suite to check for regressions
  - Use tool: [Test Runner](../tools/test-runner.md)
- [ ] Manually verify the fix if applicable
- [ ] Test edge cases around the fixed code

### 6. Code Quality
- [ ] Run linter: `npm run lint`
- [ ] Run type check: `npm run typecheck`
- [ ] Ensure no new `any` types introduced

### 7. Add Regression Prevention
- [ ] Add additional test cases for edge cases
- [ ] Consider if similar bugs could exist elsewhere
- [ ] Add guard clauses or validation if appropriate

### 8. Document
- [ ] Update bug tracking issue with fix details
- [ ] Add comment to code if the fix is non-obvious
- [ ] Update documentation if bug was due to outdated docs

## Output
- Bug fix commit with failing test now passing
- No regressions in existing tests
- Regression tests to prevent recurrence
