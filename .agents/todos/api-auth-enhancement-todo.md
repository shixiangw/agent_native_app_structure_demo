# API Authentication Enhancement — Task Tracking

> **Created**: 2026-05-11 | **Priority**: P3 | **Status**: 🔲 Pending

---

## Current Auth Implementation

### Authentication

The demo project currently has an **auth middleware placeholder** — it parses the `Authorization: Bearer <token>` header and returns 401 if missing, but does **not yet verify JWTs**. The foundation is laid for email + password → JWT flow.

Current flow (planned):

```
1. POST /api/v1/auth/login {email, password}
       │
       │ bcrypt.compare (see backend/src/utils/auth.ts)
       ▼
2. JWT 签发 (HS256)
   Claims: sub=userID, email, role, exp=now+JWT_EXPIRES_IN
       │
       ▼
3. 后续请求: Authorization: Bearer <token>
       │
       │ auth.middleware → jwt.verify() → extract userID+role
       ▼
4. Request 注入 user info
```

**关键代码位置**:

| 组件 | 文件 | 职责 |
|------|------|------|
| 鉴权中间件 | `backend/src/middleware/auth.middleware.ts` | 提取 Bearer Token → 验证 → next() |
| 用户 Service | `backend/src/services/user.service.ts` | CRUD 用户、密码哈希 |
| 密码工具 | `backend/src/utils/auth.ts` | bcrypt hash/compare |
| 用户 Controller | `backend/src/controllers/user.controller.ts` | HTTP handlers |
| 用户路由 | `backend/src/routes/user.routes.ts` | 路由注册 + authenticate 中间件 |
| 入口 | `backend/src/index.ts` | 全局中间件、路由挂载 |

### 密码存储

- 使用 bcrypt（`bcrypt` npm 包）哈希存储
- `SALT_ROUNDS = 10`，不可逆
- 密码字段不出现在 API 响应中

### 公开路由（免鉴权）

| 路由 | 原因 |
|------|------|
| `GET /api/v1/health` | 健康检查 |

### 当前局限

| 问题 | 描述 |
|------|------|
| JWT 未实现 | auth middleware 有结构但无实际验证逻辑 |
| 仅 JWT 一种方式 | 无 API Key、OAuth2、Session 等 |
| 无 token 撤销 | JWT 签发后持续有效至过期 |
| 无 refresh token | 有效期固定，过期需重新登录 |
| 密码变更后旧 token 仍有效 | 密码版本未纳入 claims 验证 |
| 登录无 rate limit | 可暴力枚举 |
| JWT_SECRET 静态 | 无密钥轮换机制 |
| 无审计日志 | 无法追踪登录尝试 |

---

## 后续增强计划（示例）

以下方案展示了一个生产级 auth 系统的扩展设计，**不是当前的实现计划**，而是作为 auth 领域的 Task Tracking 示例。

### 方案 A — API Key / Access Key

**适用场景**: 脚本、CI/CD、自动化工具。

**设计思路**:

```
User 创建 → 生成 ak_xxx 密钥 → sha256 哈希存储前缀
                                  │
请求时: Authorization: Bearer ak_xxx
                     │
        中间件: hash(ak_xxx) → 匹配 DB → 注入 userID+role
```

**端点**:
| Method | Path | 说明 |
|--------|------|------|
| `POST` | `/api/v1/auth/keys` | 创建 API Key |
| `GET` | `/api/v1/auth/keys` | 列出用户 API Key（掩码显示） |
| `DELETE` | `/api/v1/auth/keys/{id}` | 删除 API Key |

---

### 方案 B — Refresh Token

**适用场景**: SPA / Mobile App 用户体验。

**设计思路**: 双 token 模式：
- `access_token`（15m 过期，短命）
- `refresh_token`（7d 过期，一次性，轮换）

**新增端点**:
| Method | Path | 说明 |
|--------|------|------|
| `POST` | `/api/v1/auth/refresh` | 用 refresh_token 换取新 access_token |

---

### 方案 C — OAuth2 / OIDC

**适用场景**: 集成企业 SSO（LDAP、Google、GitHub、Azure AD）。

**设计思路**: 外部 IDP 验证 → 回调 → 项目签发 JWT。

**新增端点**:
| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/api/v1/auth/oauth/{provider}` | OAuth2 跳转 |
| `GET` | `/api/v1/auth/oauth/{provider}/callback` | OAuth2 回调 |

---

### 方案 D — Session Cookie

**适用场景**: 浏览器管理后台。

**设计思路**: login 后设置 `httpOnly, Secure, SameSite=Strict` cookie，服务端维护 session store。

---

### 架构重构建议

所有认证方式统一为一个 **Auth Chain**，顺序匹配：

```
Request
  │
  ├─ CookieMiddleware       （从 session cookie 解析 → userID+role）
  │    ↓ 未认证则跳过
  ├─ APIKeyMiddleware        （从 Bearer: ak_xxx 解析 → hash → 匹配 DB）
  │    ↓ 未认证则跳过
  ├─ RefreshMiddleware       （从 Bearer: rf_xxx 解析 → 轮换 → 新 access token）
  │    ↓ 未认证则跳过
  └─ BearerMiddleware        （现有 JWT Bearer 逻辑，最终兜底）
       ↓ 未认证
  401 Unauthorized
```

`AuthMiddleware` 重构为统一入口：

```ts
interface AuthResult {
  userId: string
  role: string
  authedBy: 'jwt' | 'apikey' | 'cookie' | 'oauth'
}

type AuthProvider = (req: Request) => AuthResult | null

function authChain(providers: AuthProvider[]): RequestHandler {
  return (req, res, next) => {
    for (const provider of providers) {
      const result = provider(req)
      if (result) {
        req.user = result
        return next()
      }
    }
    return next(new AppError(401, 'Authentication required'))
  }
}
```

---

## Tasks

- [ ] **实现基础 JWT 认证**
  - [ ] 安装 `jsonwebtoken` + `@types/jsonwebtoken`
  - [ ] 创建 `backend/src/services/auth.service.ts` — login: bcrypt verify → JWT sign
  - [ ] 更新 `auth.middleware.ts` — jwt.verify → 注入 `req.user`
  - [ ] 创建 `POST /api/v1/auth/login` 路由
  - [ ] 将 `JWT_SECRET`, `JWT_EXPIRES_IN` 加入环境变量
  - [ ] 注册 auth 路由到 `backend/src/index.ts`
- [ ] **重构 AuthMiddleware 为可插拔链**（示例：扩展参考）
  - [ ] 设计 `AuthProvider` 接口
  - [ ] 重构 `auth.middleware.ts` 支持多 provider 顺序匹配
  - [ ] 保留现有 JWT Bearer 作为兜底 provider
- [ ] **实现 API Key 鉴权**（示例）
  - [ ] 新增 `auth_api_keys` 表（Prisma migration）
  - [ ] 添加 API Key 生成、哈希存储、匹配逻辑
- [ ] **实现 Refresh Token**（示例）
  - [ ] 新增 `auth_refresh_tokens` 表
  - [ ] login 同时签发 refresh token
  - [ ] `POST /api/v1/auth/refresh` 端点
- [ ] **实现 OAuth2 / OIDC 集成**（示例）
  - [ ] 通用 OAuth2 provider 接口
  - [ ] 配置式注册 provider（GitHub, Google, 企业 OIDC）
  - [ ] 回调 + JWT 签发逻辑
- [ ] **实现 Session Cookie**（示例）
  - [ ] Session store（Redis / PostgreSQL）
  - [ ] Cookie 设置/验证中间件
- [ ] **登录安全增强**
  - [ ] Rate limit（express-rate-limit 配置）
  - [ ] 失败登录审计日志（IP、email、时间、user-agent）
  - [ ] 密码版本嵌入 JWT claims
  - [ ] JWT secret 轮换支持
- [ ] **写入 integration tests**
