# Tool: Database Migrator

## Description
Manages database schema changes and data migrations using Prisma Migrate. Provides a structured approach to evolving the database schema safely.

## Usage

### Create a New Migration
```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name <descriptive_name>
# 3. Regenerate Prisma Client
npx prisma generate
```

### Migration Naming
- Use lowercase with underscores
- Prefix with action: `add_`, `create_`, `drop_`, `rename_`, `alter_`
- Examples:
  - `create_user_table`
  - `add_email_to_user`
  - `rename_post_title`

### Check Migration Status
```bash
npx prisma migrate status
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

### Run Data Migration
```bash
# Place script in backend/src/utils/migrations/
npx ts-node backend/src/utils/migrations/<script>.ts
```

## Safety Checklist
- [ ] Migration tested on staging database
- [ ] No destructive operations without data backup
- [ ] Forward migration is idempotent where possible
- [ ] Rollback plan documented
- [ ] Prisma Client regenerated after schema change

## Common Patterns

### Adding a Non-Nullable Column to Existing Table
```prisma
// Step 1: Add as optional
status String?

// Step 2: Run data migration to populate existing rows

// Step 3: Make required
status String @default("pending")
```

### Renaming a Column
```prisma
// Step 1: Add new column
newName String?

// Step 2: Migrate data from old column to new

// Step 3: Drop old column
// (remove oldName field from model)
```
