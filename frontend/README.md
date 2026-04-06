# Frontend

React 18 + Vite 5 + TypeScript + TailwindCSS frontend application.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript 5 (strict mode)
- **Styling**: TailwindCSS 3
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page-level components (routes)
│   ├── services/       # API call functions
│   ├── store/          # Zustand stores
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint and type check
npm run lint
npm run typecheck
```

## Development Guidelines

### Component Structure
- Functional components only (no class components)
- Co-locate component files with their tests and styles
- Use TypeScript interfaces for all props
- Handle loading, error, and empty states

### State Management
- Local state: `useState`, `useReducer`
- Global state: Zustand stores in `store/`
- Server state: Consider React Query for caching

### API Integration
- All API calls go through `services/` layer
- Never call fetch/axios directly in components
- Use consistent error handling patterns

### Styling
- TailwindCSS utility classes only
- No CSS modules or styled-components
- Use `clsx` for conditional class names

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest tests |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |
| `npm run format` | Prettier formatting |
