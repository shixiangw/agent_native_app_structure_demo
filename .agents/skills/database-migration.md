# Skill: Database Migration

## Description
Expert in managing database schema changes using Prisma Migrate. Use this skill when modifying the database schema, adding relations, or migrating data.

## When to Use
- Adding new database tables or columns
- Modifying existing columns or relations
- Data migration between schema versions
- Rolling back schema changes

## Guidelines

### Migration Workflow
1. Update `schema.prisma` with desired changes
2. Run `npx prisma migrate dev --name descriptive_name`
3. Review the generated SQL migration file
4. Run `npx prisma generate` to update the Prisma client
5. Test the application against the new schema
6. Commit both the schema change and migration file

### Naming Conventions
- Migration names should be descriptive and lowercase with underscores
- Example: `add_user_role_field`, `create_post_comments_table`
- One logical change per migration

### Safe Migration Practices
- Always back up production data before running migrations
- Test migrations on a staging database first
- Avoid destructive changes (DROP, DELETE) without data migration
- For column renames: add new column, copy data, drop old column in separate migrations
- For type changes: add new column, migrate data, update app, drop old column

### Data Migrations
- Use Prisma Client scripts for complex data migrations
- Place migration scripts in `backend/src/utils/migrations/`
- Run data migrations after schema migrations
- Ensure data migrations are idempotent

### Rollback Strategy
- Keep migration files in version control
- Use `npx prisma migrate reset` for development only
- For production, write forward-only migrations
- Document any manual steps required for rollback

## Common Operations

### Add a Column
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  role      String   @default("user")  // new field
}
```

### Add a Relation
```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

## Output Expectations
- Clean, reversible migration files
- Zero data loss migrations
- Proper foreign key constraints
- Indexed columns for query performance
