# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## What this is

`react-test-config` is a tiny TypeScript library (single file: `src/index.ts`) that configures the React testing environment. Its primary purpose is to disable React 19's owner-stack collection during tests, which improves test performance by preventing React from building component stack traces on every render.

## Commands

```bash
pnpm build          # compile to dist/ (CJS + ESM + .d.ts)
pnpm dev            # watch mode build
pnpm typecheck      # tsc --noEmit
```

No test runner is configured yet.

## Architecture

**Single export:** `disableOwnerStacks()` in `src/index.ts`.

**Owner-stacks disabling** works by accessing `React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.recentlyCreatedOwnerStacks` and replacing it with a configurable getter/setter via `Object.defineProperty`.

Setting `recentlyCreatedOwnerStacks` to `Infinity` causes React to skip all owner-stack collection logic.

**Build:** `tsdown` (rolldown-based bundler) outputs `dist/index.cjs`, `dist/index.mjs`, and declaration files for both module formats. Config is in `tsdown.config.ts`.

React 19 is a peer dependency — the library accesses its internals and must not bundle React itself.
