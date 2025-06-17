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
HotFit/
├── frontend/         # React + Vite app
├── backend/          # Express + Prisma API
│   ├── prisma/       # Prisma schema + migrations
│   ├── src/          # Server code & routers
│   ├── .env          # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
├── README.md         # This setup guide
└── .gitignore
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
