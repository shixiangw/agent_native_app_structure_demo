# Workflow: Frontend Development

## Description
Expert in React 18 + TypeScript + Vite + TailwindCSS frontend development. Follow this workflow when building UI components, managing state, handling routing, or styling the frontend application.

## When to Use
- Creating new React components
- Implementing UI features or pages
- Refactoring frontend code
- Adding state management logic
- Styling with TailwindCSS

## Steps

### 1. Plan Component Structure
- [ ] Design the component hierarchy and data flow
- [ ] Define TypeScript interfaces for props and state
- [ ] Decide on component boundaries (extract sub-components if >200 lines)
- [ ] Co-locate related files (component, styles, tests)

### 2. Implement State Management
- [ ] Use React hooks (`useState`, `useReducer`) for local state
- [ ] Use Zustand for global/app-level state
- [ ] Avoid prop drilling beyond 2 levels; use context or store
- [ ] Memoize expensive computations with `useMemo` and `useCallback`

### 3. Integrate APIs
- [ ] Use the `services/` layer for all API calls
- [ ] Never call `fetch` or `axios` directly in components
- [ ] Handle loading, error, and success states consistently
- [ ] Use React Query for server state caching when applicable

### 4. Apply Styling
- [ ] Use TailwindCSS utility classes exclusively
- [ ] No inline styles unless dynamically computed
- [ ] Use `clsx` or `cn` utility for conditional class names
- [ ] Follow mobile-first responsive design

### 5. Ensure Code Quality
- [ ] Use `PascalCase.tsx` for component files
- [ ] Use `useCamelCase.ts` for hooks
- [ ] Use `camelCase.ts` for utils and types
- [ ] Add proper error boundaries and loading states
- [ ] Ensure accessible markup (ARIA attributes, semantic HTML)
- [ ] Verify responsive design across breakpoints

## Output Expectations
- Production-ready TypeScript code
- Proper error boundaries and loading states
- Accessible markup (ARIA attributes, semantic HTML)
- Responsive design across breakpoints
