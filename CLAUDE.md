# Commands
All commands must be executed within the project root directory.
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production: `npm run build`
- Run linter: `npm run lint`
- Preview build: `npm run preview`
*Note: No testing framework is currently implemented.*

# Project Rules & Constraints
- **RESTRICTED DIRECTORY**: **DO NOT** modify, delete, or create files in the `work/` directory. It is unversioned and strictly off-limits.
- **Target Directory**: All development must occur in the project root (previously `corpboard/`, now moved to root for Amplify compatibility).
- **Tech Stack**: Vite, React 19, Tailwind CSS 3.4.

# Architecture & Conventions
- **State & Routing**: Do not use external routers. All state is centralized in `App.jsx`. Switch screens by mutating the `currentView` state (`'feed'` | `'detail'` | `'create'`).
- **Data Fetching**: API requests go through `src/api/client.js` (returns `null` if `VITE_API_BASE_URL` is unset). Always rely on `src/hooks/useThreads.js`, which handles the fallback to static mock data in `src/data/mock.js`.
- **Layout Behavior**: 3-column layout (Sidebar -> `main` thread list -> `section` detail/create). The `main` thread list must be hidden when `currentView === 'create'`.
- **Comment System**: Treat comments as a flat array. Parent-child relationships use `parentId` and `replyToNo`. Support `>>N` reply notation. Use `CommentBlock` for recursive rendering.
- **Markdown & Security**: Always render markdown with XSS protection using the `react-markdown` + `remark-gfm` + `rehype-sanitize` stack. Use the existing `MarkdownEditor` component for editing/previewing.