# AGENTS.md

## Commands
- Install: `pnpm install`
- Build all: `pnpm run build`
- Dev server: `pnpm run dev` (runs web app)
- Test all: `pnpm run test`
- Single test: `cd apps/web && NODE_OPTIONS='--loader tsx' mocha './src/path/to/file.test.ts'`
- Typecheck: `cd apps/web && npx tsc --noEmit`

## Architecture
- Monorepo using pnpm workspaces
- `apps/web/` - React frontend (Vite, TypeScript, deployed to Vercel)
- `packages/` - Shared packages (currently empty)
- Tests use Mocha with tsx loader; test files are `*.test.ts`

## Code Style
- Tabs for indentation (tabWidth: 2)
- Strict TypeScript with `noUnusedLocals`, `noUnusedParameters`
- React uses `react-jsx` transform (no React import needed for JSX)
- Imports: named exports preferred, relative imports for local modules
- No semicolons enforcement, but codebase uses them consistently
