# Workflow: Release

## Description
Workflow for preparing and executing a release of the application. Covers versioning, changelog, building, and deployment.

## Steps

### 1. Pre-Release Checks
- [ ] All feature branches merged to main
- [ ] No open critical bugs or P0 issues
- [ ] Full test suite passing
  - Use tool: [Test Runner](../tools/test-runner.md)
- [ ] No lint or type errors
- [ ] Database migrations applied and tested

### 2. Version Bump
- [ ] Determine version type:
  - `patch` - Bug fixes only (0.0.X)
  - `minor` - New features, backward compatible (0.X.0)
  - `major` - Breaking changes (X.0.0)
- [ ] Update version in:
  - `package.json`
  - `frontend/package.json`
  - `backend/package.json`
- [ ] Create or update `CHANGELOG.md`

### 3. Build Verification
- [ ] Build frontend: `cd frontend && npm run build`
- [ ] Build backend: `cd backend && npm run build`
- [ ] Verify production build has no errors
- [ ] Test Docker build: `docker compose build`

### 4. Create Release Tag
```bash
git tag -a v{version} -m "Release v{version}"
git push origin v{version}
```

### 5. Deploy
- [ ] Deploy to staging environment first
- [ ] Run smoke tests against staging
- [ ] If staging passes, deploy to production
- [ ] Monitor error logs post-deployment

### 6. Post-Release
- [ ] Verify production health checks
- [ ] Monitor error tracking (Sentry, etc.)
- [ ] Announce release to stakeholders
- [ ] Update project documentation if needed

## CI/CD Pipeline
The release is automated via GitHub Actions:
- See: [.github/workflows/cd.yml](../../.github/workflows/cd.yml)

Triggered by pushing a version tag.

## Rollback Procedure
If issues are detected post-release:
1. Revert to previous Docker image/tag
2. If database migration caused issue, run rollback migration
3. Communicate incident to team
4. Create post-mortem and fix root cause
