# MES UI Automation Harness (Playwright + TypeScript)

This repository provides a modular, CI-friendly UI automation harness for MES scenarios. It supports MCP-assisted flow capture, maintainable scenario code, and per-test video artifacts for demo/documentation use.

## Why this stack
- **Playwright + TypeScript** is a strong fit for deterministic UI testing and maps directly to MCP browser interactions.
- Built-in artifacts: video, trace, screenshots, HTML report.
- Clean test/fixture/page abstractions for maintainability.

## Project structure

```text
.
├── .github/workflows/ui-tests.yml      # CI pipeline + artifact publishing
├── src/
│   ├── config/env.ts                   # Environment variable parsing/validation
│   ├── fixtures/test-base.ts           # Shared fixtures / auth storage wiring
│   └── pages/login-page.ts             # Example page object abstraction
├── tests/scenarios/mes-smoke.spec.ts   # Scenario-focused tests
├── artifacts/                          # Runtime test results (generated)
├── playwright.config.ts                # Playwright runtime + artifact policy
├── .env.example                        # Environment configuration template
└── README.md
```

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env
```

Update `.env` values, especially `MES_BASE_URL` and (optionally) `MES_USERNAME`, `MES_PASSWORD`.

## Run tests locally

```bash
npm run test
npm run test:headed
npm run test:list
npm run typecheck
```

## Artifact behavior
- **Video:** per test (`PW_VIDEO=on` by default).
- **Trace:** retained on failure (`PW_TRACE=retain-on-failure`).
- **Screenshot:** captured on failure (`PW_SCREENSHOT=only-on-failure`).
- **HTML report:** `artifacts/reports/html/index.html`.
- **Raw results:** `artifacts/test-results/`.

## Environment variables
Core variables from `.env.example`:
- `MES_BASE_URL`: target MES URL.
- `AUTH_ENABLED`: when `true`, loads storage state from `PW_STORAGE_STATE`.
- `MES_USERNAME`, `MES_PASSWORD`: credentials for login scenarios.
- `BROWSER_NAME`: chromium/firefox/webkit.
- `HEADLESS`: `true`/`false`.
- `PW_VIDEO`, `PW_TRACE`, `PW_SCREENSHOT`: artifact policies.

## Using MCP-generated interactions in scenarios
1. Record or rehearse a flow with Playwright MCP/browser interactions.
2. Copy generated steps into a new scenario under `tests/scenarios/`.
3. Refactor brittle selectors into stable locators (`getByRole`, `getByLabel`, `data-testid`).
4. Move repeated page behavior into page objects under `src/pages/`.
5. Keep business-intent comments and test.step blocks for demo readability.

## CI
GitHub Actions workflow: `.github/workflows/ui-tests.yml`
- Installs deps and Playwright browser.
- Runs tests headless.
- Publishes `artifacts/` and Playwright report as downloadable artifacts.

## Migration notes
This repository previously had no framework implementation. The current scaffold introduces a full Playwright/TypeScript baseline with environment-driven configuration and reusable abstractions.
