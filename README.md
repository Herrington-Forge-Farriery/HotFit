# HotFit Full-Stack Application

This repository contains a **React + Vite** frontend and an **Express + SQLite/Prisma** backend for the HotFit mobile-first application. Use this README as your go-to setup guide for cloning, configuring, and running the project locally.

---

## 🔑 Prerequisites

* **Git** (v2.30+): for version control and repository cloning.
* **Node.js** (v18 LTS or later) & **npm**: for package management.
* **VS Code** (optional but recommended): IDE with Prettier, ESLint, and Git integration.
* **PowerShell** (or your preferred terminal) on Windows.
* **SQLite**: no installation needed – Prisma will create a local `dev.db` file.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone git@github.com:herrington-farrier/HotFit.git
cd HotFit
```

### 1. SSH & GitHub

> Ensure your SSH key is added to GitHub for seamless `git push`/`git pull`.

```bash
# If you haven’t run the SSH setup script:
#   backend/scripts/setup_ssh_github.ps1 (or your global setup)
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install             # Install dependencies
npm run dev             # Start Vite dev server at http://localhost:5173
npm run lint            # Run ESLint + Prettier auto-fixes
npm run test            # Run Vitest suite for component tests
npm run build           # Build production assets to dist/
```

* **Config files:**

  * `.env` (optional) – environment overrides
  * `vite.config.ts` – Vite + React + Vitest config
  * `eslint.config.js` – ESLint flat config
  * `tsconfig.json` – TypeScript config

---

## 🛠️ Backend Setup

```bash
cd ../backend
npm install             # Install dependencies
```

1. **Environment variables**: copy the template and adjust as needed.

   ```bash
   cp .env.example .env
   # Edit .env to set DATABASE_URL and PORT
   ```

2. **Prisma migrations**:

   ```bash
   npx prisma migrate dev --name init   # Create or apply migrations
   npx prisma generate                  # Generate Prisma Client
   ```

3. **Start server**:

   ```bash
   npm run dev       # Runs nodemon + ts-node, listens on http://localhost:4000
   npm run build     # Compile TS to dist/
   npm start         # Run production build from dist/
   ```

* **Key files:**

  * `prisma/schema.prisma` – database data model
  * `src/index.ts` – Express server entrypoint
  * `src/routes/` – modular route definitions
  * `tsconfig.json` – TypeScript config

---

## 📂 Folder Structure

```
HotFit/                               ← Repo root
├── package.json                     ← npm workspaces config
├── package-lock.json
├── common/                          ← Shared code (types, API, hooks)
│   ├── package.json
│   └── src/
│       ├── api.ts
│       ├── types.ts
│       └── hooks/
│           ├── useOfflineScans.web.ts
│           ├── useOfflineScans.native.ts
│           └── useOfflineScans.ts     ← entry-point switching on Platform.OS
├── frontend/                        ← React + Vite web app
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── src/
│   │   ├── db.ts                     ← Dexie + fake-indexeddb polyfill
│   │   ├── hooks/
│   │   │   ├── useOfflineScans.ts
│   │   │   └── useBarcodes.ts
│   │   └── components/
│   │       ├── scanner.tsx
│   │       └── barcodelist.tsx
│   └── tests/
│       ├── components/
│       │   ├── scanner.test.tsx
│       │   └── barcodelist.test.tsx
│       └── hooks/
│           └── useBarcodes.test.ts
├── backend/                         ← Express + Prisma API
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── index.ts                  ← exports `app` & `prisma`
│   │   └── routes/
│   │       ├── client.ts
│   │       ├── horse.ts
│   │       ├── invoice.ts
│   │       ├── scan.ts
│   │       └── timecard.ts
│   └── tests/
│       ├── client.test.ts
│       ├── horse.test.ts
│       ├── invoice.test.ts
│       ├── scan.test.ts
│       └── timecard.test.ts
└── mobile/                          ← React Native CLI app (TypeScript)
    ├── package.json
    ├── ios/ & android/              ← native platform folders
    ├── src/
    │   ├── App.tsx
    │   ├── hooks/
    │   │   └── useOfflineScans.native.ts
    │   └── components/
    │       └── Scanner.tsx           ← Vision Camera integration
    └── __tests__/
        └── scanner.test.tsx         ← RN Testing Library tests


```

---

## 🎯 Workflows & Tips

* **Git branching**: use `feature/*`, `bugfix/*`, `hotfix/*` naming conventions.
* **Trello integration**: cards auto-link PRs — use the checklist template for GitHub workflow.
* **Testing**: write Vitest tests in `frontend/src/*.test.tsx`, and consider jest-like syntax in backend with your preferred framework.
* **Lint/Format**: run `npm run lint` before commits; consider adding a pre-commit hook via Husky.

---

## 📚 Resources

* [React Documentation](https://reactjs.org)
* [Vite Documentation](https://vitejs.dev)
* [Prisma Docs](https://www.prisma.io/docs)
* [Express Guide](https://expressjs.com/en/starter/installing.html)
* [Vitest](https://vitest.dev)
* [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

---

*Happy coding!* 🎉
