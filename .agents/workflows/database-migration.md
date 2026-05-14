# Workflow: Database Migration

## Description
Expert in managing database schema changes using Prisma Migrate. Follow this workflow when modifying the database schema, adding relations, or migrating data.

## When to Use
- Adding new database tables or columns
- Modifying existing columns or relations
- Data migration between schema versions
- Rolling back schema changes

## Steps

### 1. Update Schema
- [ ] Edit `schema.prisma` with desired changes
- [ ] Define models with clear relations
- [ ] Use descriptive field names with proper types
- [ ] Add indexes on frequently queried fields

### 2. Generate Migration
- [ ] Run `npx prisma migrate dev --name descriptive_name`
- [ ] Use lowercase with underscores for migration names
- [ ] Example: `add_user_role_field`, `create_post_comments_table`
- [ ] One logical change per migration

### 3. Review Migration
- [ ] Review the generated SQL migration file
- [ ] Verify foreign key constraints are correct
- [ ] Check for unintended destructive changes
- [ ] Run `npx prisma generate` to update the Prisma client

### 4. Test the Changes
- [ ] Run the application against the new schema
- [ ] Verify existing functionality still works
- [ ] Test edge cases around the schema changes

### 5. Follow Safe Practices
- [ ] Always back up production data before running migrations
- [ ] Test migrations on a staging database first
- [ ] Avoid destructive changes (DROP, DELETE) without data migration
- [ ] For column renames: add new column, copy data, drop old column in separate migrations
- [ ] For type changes: add new column, migrate data, update app, drop old column

### 6. Handle Data Migrations
- [ ] Use Prisma Client scripts for complex data migrations
- [ ] Place migration scripts in `backend/src/utils/migrations/`
- [ ] Run data migrations after schema migrations
- [ ] Ensure data migrations are idempotent

### 7. Finalize
- [ ] Commit both the schema change and migration file
- [ ] Keep migration files in version control
- [ ] Use `npx prisma migrate reset` for development only
- [ ] For production, write forward-only migrations
- [ ] Document any manual steps required for rollback

## Output Expectations
- Clean, reversible migration files
- Zero data loss migrations
- Proper foreign key constraints
- Indexed columns for query performance
