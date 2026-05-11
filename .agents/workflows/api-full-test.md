# Workflow: API Full Test & Fix

## Description
End-to-end workflow for testing every API endpoint against a running Express server and fixing any failures. Use when asked to do a full API test, smoke test, or endpoint verification.

The HTTP stack is **Express 4 + TypeScript**; response format is `{ success, data?, error? }`.

## Trigger
- User says: "全量测试", "test all APIs", "verify all endpoints", "smoke test", "API 测试"
- After major changes that touch multiple handlers
- Before release

## Prerequisites
- Node.js 20+
- npm dependencies installed: `npm install`
- TypeScript compiled: `npm run build`
- Server running on port 3000

## Steps

### 1. Check API Changes & Adapt Test Cases
```bash
grep -rn "router\.\(get\|post\|put\|patch\|delete\)" backend/src/routes/ --include="*.ts"
```
Compare with previous run. Note any new/removed/changed endpoints.

### 2. Ensure Database / Dependencies Ready
```bash
# Install dependencies
npm install

# TypeScript compilation check
npx tsc --noEmit

# Build
npm run build
```

### 3. Start Server
```bash
# Kill any existing process on port 3000
lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1

# Start server in background
npm run dev &
sleep 3

# Verify server is running
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health
# Should return 200
```

### 4. Health Check (public)
```bash
curl -s http://localhost:3000/api/v1/health | jq .
```
Expected: `{"success":true,"data":{"status":"ok","timestamp":"...","uptime":...}}`

### 5. Test User CRUD
```bash
BASE="http://localhost:3000"
CT="Content-Type: application/json"

# Create user
echo "--- Create User ---"
USER=$(curl -s -X POST "$BASE/api/v1/users" -H "$CT" -d '{
  "name":"Test User",
  "email":"test@example.com",
  "password":"test123"
}' | jq '.')
echo "$USER"
USER_ID=$(echo "$USER" | jq -r '.data.id')
echo "Created User ID: $USER_ID"

# Get user by ID
echo "--- Get User ---"
curl -s "$BASE/api/v1/users/$USER_ID" | jq '.'

# List users
echo "--- List Users ---"
curl -s "$BASE/api/v1/users" | jq '.'

# Update user
echo "--- Update User ---"
curl -s -X PUT "$BASE/api/v1/users/$USER_ID" -H "$CT" \
  -d '{"name":"Updated User"}' | jq '.'

# Delete user
echo "--- Delete User ---"
curl -s -X DELETE "$BASE/api/v1/users/$USER_ID" | jq '.'

# Verify deletion
echo "--- Verify Deletion (expect 404) ---"
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/v1/users/$USER_ID"
# Should return 404
```
Expected: Create → 201. Get/List/Update → 200. Delete → 200. Verify deletion → 404.

### 6. Test Validation
```bash
# Create user with missing required field
echo "--- Validation: missing name ---"
curl -s -X POST "$BASE/api/v1/users" -H "$CT" \
  -d '{"email":"test@example.com","password":"test123"}' | jq '.'

# Create user with invalid email
echo "--- Validation: invalid email ---"
curl -s -X POST "$BASE/api/v1/users" -H "$CT" \
  -d '{"name":"Test","email":"not-an-email","password":"test123"}' | jq '.'

# Get user with invalid ID format
echo "--- Validation: invalid id format ---"
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/v1/users/not-a-uuid"
```

### 7. Test Auth (when implemented)
```bash
# Login
echo "--- Login ---"
TOKEN=$(curl -s -X POST "$BASE/api/v1/auth/login" -H "$CT" \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.data.token')
echo "TOKEN=$TOKEN"

# Access protected route
echo "--- Protected Route ---"
curl -s "$BASE/api/v1/users" -H "Authorization: Bearer $TOKEN" | jq '.'

# Access without token
echo "--- No Auth (expect 401) ---"
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/v1/users"
# Should return 401

# Access with invalid token
echo "--- Invalid Token (expect 401) ---"
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/v1/users" \
  -H "Authorization: Bearer invalid-token"
# Should return 401
```

### 8. Test 404 & Error Handling
```bash
# Non-existent route
echo "--- 404 Route ---"
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/v1/nonexistent"
# Should return 404

# Non-existent user
echo "--- 404 User ---"
curl -s "$BASE/api/v1/users/00000000-0000-0000-0000-000000000000" | jq '.'
# Should return 404 with error message
```

### 9. Report Results
Each section gets a **PASS** / **FAIL**:
- Check HTTP status codes match expected
- Check response bodies contain expected fields and `success` flag
- Log any error responses for diagnosis

### 10. Fix Failures (if any)
1. Check server logs for error details
2. Diagnose: validation schema wrong? Error handler missing?
3. Fix: update code, recompile
4. Restart server and re-test failing endpoints

### 11. Clean Up
```bash
# Kill the test server
lsof -ti:3000 | xargs kill 2>/dev/null

# Run unit tests
npm run test:unit

# Run type check
npm run typecheck

# Run linter
npm run lint
```

## Common Issues & Quick Fixes

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `404` on user endpoints | User routes not registered in index.ts | Check `backend/src/index.ts` for `app.use('/api/v1/users', userRoutes)` |
| `422` on POST/PUT | Zod validation failed | Check request body matches schema in `types/user.schema.ts` |
| `500` with TypeScript errors | Build needed | Run `npm run build` or `npx tsc --noEmit` to check types |
| `401` on protected routes | No auth middleware or token missing | Check `auth.middleware.ts` and ensure `Authorization: Bearer` header sent |
| Empty user list | In-memory store, data lost on restart | Data is ephemeral; create users in test flow |
| `ECONNREFUSED` | Server not running | Check `lsof -ti:3000` and start server |

## Endpoint Inventory

| Area | Count | Endpoints |
|------|-------|-----------|
| Health | 1 | `GET /api/v1/health` |
| Users | 5 | `GET/POST /api/v1/users`, `GET/PUT/DELETE /api/v1/users/:id` |
| Auth | 1 | `POST /api/v1/auth/login` (planned) |
| **Total** | **6-7** | |
