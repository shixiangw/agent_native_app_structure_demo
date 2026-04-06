# Skill: Frontend Development

## Description
Expert in React 18 + TypeScript + Vite + TailwindCSS frontend development. Use this skill when building UI components, managing state, handling routing, or styling the frontend application.

## When to Use
- Creating new React components
- Implementing UI features or pages
- Refactoring frontend code
- Adding state management logic
- Styling with TailwindCSS

## Guidelines

### Component Structure
- Use functional components with TypeScript interfaces
- Co-locate related files (component, styles, tests)
- Export components as default, types as named exports
- Keep components under 200 lines; extract sub-components when larger

### State Management
- Use React hooks (`useState`, `useReducer`) for local state
- Use Zustand for global/app-level state
- Avoid prop drilling beyond 2 levels; use context or store
- Memoize expensive computations with `useMemo` and `useCallback`

### API Integration
- Use the `services/` layer for all API calls
- Never call `fetch` or `axios` directly in components
- Handle loading, error, and success states consistently
- Use React Query for server state caching when applicable

### Styling
- Use TailwindCSS utility classes exclusively
- No inline styles unless dynamically computed
- Use `clsx` or `cn` utility for conditional class names
- Follow mobile-first responsive design

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Types: `camelCase.ts`

## Output Expectations
- Production-ready TypeScript code
- Proper error boundaries and loading states
- Accessible markup (ARIA attributes, semantic HTML)
- Responsive design across breakpoints
