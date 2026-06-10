# react-frontend-template

Personal starter for React + FastAPI projects. Clone this, don't think, start building.

## Stack
- Vite 6 + React 19 + TypeScript (strict)
- React Router 7
- Tailwind CSS 4
- ESLint + Prettier (4-space indent)
- Tiny `useFetch` hook instead of a fetching library

## First thing to do after cloning
```bash
npm install
cp .env.example .env   # edit VITE_API_BASE_URL if needed
npm run dev
```
Dev server: http://localhost:5000  
`/api/*` proxied to FastAPI on `:8000` — no CORS config needed.

## Scripts
```bash
npm run dev       # dev server
npm run build     # typecheck + build
npm run lint
npm run format
```

## Auth
Session auth via httponly cookies. The backend must implement:

| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Sets cookie, returns `{ success: true }` |
| POST | `/auth/signup` | Creates user, returns `UserResponse` |
| POST | `/auth/logout` | Clears cookie |
| GET | `/auth/me` | Returns current user or 401 |

**`useAuth()`** — call from any component inside `App`:
```ts
const { user, loading, login, signup, logout } = useAuth();
```

**Protected routes** — nest inside the existing `<Route element={<ProtectedRoute />}>` block in `App.tsx`. Unauthenticated users are redirected to `/login`:
```tsx
<Route element={<ProtectedRoute />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/my-page" element={<MyPage />} />  {/* add here */}
</Route>
```

**Public routes** — add outside that block, alongside `/login` and `/signup`.

## Add a page
1. `src/pages/MyPage.tsx` — export a component
2. `App.tsx` — add `<Route path="/my" element={<MyPage />} />` (inside or outside `ProtectedRoute`)
3. Fetch: `useFetch<MyType>("/my-endpoint")`

## When to upgrade
- Many pages → `src/pages/` (already there)
- Caching/refetch pain → swap `useFetch` for TanStack Query
- Types drifting from backend → generate from FastAPI's OpenAPI with `openapi-typescript`

## Env vars
| Variable | Default | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | `/api` | Change in prod to full backend URL |

Secrets go in `.env` (gitignored). Template vars go in `.env.example` (committed).
