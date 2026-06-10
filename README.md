# Monorepo Scaffold

A minimal bootstrap scaffold for TypeScript + Python monorepos.

This repository is intentionally small. It provides the shared project hygiene that most
repositories need before application code exists: tool and package manager pinning, strict
TypeScript defaults, a modern Python toolchain (uv + Ruff), formatting, linting, staged-file
checks, CI, and editor/devcontainer hints.

## What Is Included

Shared:

- mise config for unified tool management (Node.js, pnpm, uv, AutoCorrect)
- Prettier formatting for TS/JS, Markdown, JSON, and YAML
- AutoCorrect CJK copywriting cleanup
- Husky pre-commit and pre-push hooks with lint-staged
- GitHub Actions lint and AI code-review workflows
- Basic `.env.example`, `.gitignore`, VS Code, and devcontainer files

TypeScript:

- pnpm workspace over `apps/*` and `packages/*`
- Strict `tsconfig.json` defaults
- Reusable ESLint flat config (type-aware `typescript-eslint`)

Python:

- uv workspace under `apps/` and `packages/` with a single shared lockfile
- Ruff linter + formatter configured in the root `pyproject.toml`
- Python version pinned in `.python-version` (uv installs it automatically)

## What Is Not Included

- No app framework
- No build tool
- No test runner
- No runtime entrypoint
- No generated source tree

Add those only when a real project needs them.

## Layout

```
apps/        # deployable applications (TypeScript or Python)
packages/    # shared libraries (TypeScript or Python)
```

TypeScript and Python members share the same two directories, and a member can even belong
to both ecosystems. pnpm discovers members through the `apps/*` / `packages/*` globs in
`pnpm-workspace.yaml`: a directory joins by having a `package.json`. Python members are
instead listed explicitly in `[tool.uv.workspace]` in the root `pyproject.toml`, because uv
requires every glob match to be a Python project — globs would break the moment a
TypeScript-only package appears. `uv init` maintains that member list for you.

## Quick Start

With [mise](https://mise.jdx.dev) (recommended — installs Node.js, pnpm, uv, and AutoCorrect):

```sh
mise run setup
```

[Activate mise](https://mise.jdx.dev/getting-started.html) in your shell so the managed
tools are on PATH, or prefix commands with `mise exec --`; `mise run lint` and
`mise run format` also work without activation.

Or manually, with Node.js, pnpm, uv, and
[AutoCorrect](https://github.com/huacnlee/autocorrect) already installed
(e.g. `brew install node pnpm uv autocorrect`):

```sh
pnpm install
uv sync
```

## Commands

Format files (Prettier + Ruff + AutoCorrect):

```sh
pnpm run format
```

Run all lint checks (ESLint + Prettier, Ruff, AutoCorrect):

```sh
pnpm run lint
```

Run lint checks for one ecosystem:

```sh
pnpm run lint:js
pnpm run lint:py
pnpm run lint:text
```

Run lint fixes and formatting:

```sh
pnpm run lint:fix
```

## Adding Workspace Members

A TypeScript package:

```sh
mkdir -p packages/my-lib && cd packages/my-lib && pnpm init
```

Give it an `eslint.config.mjs` that imports `baseConfig` and `createTypeScriptConfig` from
the root `eslint.config.mjs`, a `tsconfig.json` extending the root one, and `lint` /
`lint:fix` scripts (e.g. `eslint .`) — the root `pnpm run lint` runs them across all
workspace packages via `pnpm -r run lint`.

A Python package:

```sh
uv init --package packages/my-tool && uv sync
```

`uv init` appends the member to `[tool.uv.workspace]` in the root `pyproject.toml`
automatically; Ruff settings are inherited from the root, and all members share one
lockfile and virtual environment.

## Git Hooks

- `pre-commit` runs lint-staged: ESLint on staged TypeScript, Ruff on staged Python, plus
  Prettier and AutoCorrect on all staged files.
- `pre-push` runs Git LFS, so `git-lfs` must be installed.

The hooks need pnpm, uv, and AutoCorrect on PATH. If a GUI Git client doesn't load your
shell profile, provide them via husky's `~/.config/husky/init.sh`, e.g.
`eval "$(mise activate bash --shims)"`.

## Usage

Start from this scaffold when you want a clean TypeScript + Python repository foundation
without choosing an application framework up front. Keep the base small, add
project-specific tools deliberately, and prefer extending the existing config over
replacing it.
