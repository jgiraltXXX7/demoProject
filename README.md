# demoProject — Playwright + TypeScript (UI • API • DB)

A lean, code-challenge-ready SDET demo framework showing::
- **UI tests** with Page Objects, stable locators, traces/videos on failure  
- **API tests** with rich request/response logging + report attachments  
- **DB tests** against Dockerized Postgres (or in-memory fallback), using safe transactions  
- Easy **environment switching** via `.env.local` / `.env.staging`  
- **Reports**: Playwright HTML (built-in) and optional Allure

---

## ✅ Prerequisites

- **Node.js** ≥ 18 (LTS) and **npm**
- **Git** and a code editor (VS Code recommended)
- **Docker Desktop** (for the DB demo)
- **Java** (optional, for Allure CLI)
  - Check: `java -version`
- **Browsers for Playwright**  
  `npx playwright install`

> Windows users: this repo’s scripts are **PowerShell-friendly**. macOS/Linux equivalents are the same without PowerShell syntax.

---

## 🔧 Quick start

```bash
# 1) install deps
npm i
npx playwright install

# 2) copy envs from the example
cp .env.example .env.local
cp .env.example .env.staging

# 3) run a quick UI smoke
ENV=local npm run ui

demoProject/
├─ docker-compose.yml
├─ db/
│  └─ init/
│     ├─ 001_schema.sql        # users table
│     └─ 002_seed.sql          # Alice/Bob demo rows
├─ .env.example                # safe template (commit this)
├─ .env.local                  # local values (ignored)
├─ .env.staging                # staging values (ignored)
├─ playwright.config.ts        # projects: ui, api, db; reporters; trace/video
├─ src/
│  ├─ fixtures/
│  │  ├─ apiContext.ts         # APIRequestContext fixture
│  │  └─ db.ts                 # pg Pool fixture (DB)
│  ├─ pages/
│  │  └─ homePage.ts           # small Page Object
│  └─ tests/
│     ├─ ui/
│     │  └─ smoke.home.spec.ts
│     ├─ api/
│     │  ├─ users.api.spec.ts  # with rich HTTP logging + attachments
│     │  └─ graphql.sample.spec.ts (optional)
│     └─ db/
│        └─ health.db.spec.ts
├─ tsconfig.json
├─ package.json
└─ .gitignore

🔐 Environments
# UI
APP_ORIGIN=https://playwright.dev

# API
API_BASE_URL=https://jsonplaceholder.typicode.com

# DB (Dockerized Postgres)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=demo
DB_USER=postgres
DB_PASSWORD=postgres

🧪 Scripts
Core

"test":      "playwright test",
"ui":        "playwright test --project=ui",
"api":       "playwright test --project=api",
"db":        "playwright test --project=db",
"ui:watch":  "playwright test --project=ui --ui"

Reports

"report":      "playwright show-report",
"ui:report":   "playwright test --project=ui --reporter=list,html && playwright show-report",
"api:report":  "playwright test --project=api --reporter=list,html && playwright show-report",
"db:report":   "playwright test --project=db --reporter=list,html && playwright show-report",
"trace":       "playwright show-trace test-results/**/trace.zip",
"allure:gen":  "allure generate --clean ./allure-results -o ./allure-report",
"allure:open": "allure open ./allure-report"

Dockerized DB

"db:up":    "docker compose up -d",
"db:down":  "docker compose down",
"db:reset": "docker compose down -v && docker compose up -d",
"db:logs":  "docker compose logs -f postgres",
"db:shell": "docker exec -it demoproject-pg psql -U postgres -d demo -c \"\\dt\""
