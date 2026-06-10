export default {
  // Eslint for TypeScript files
  "**/*.{ts,tsx}": ["pnpm exec eslint --fix"],
  // Ruff for Python files
  "**/*.py": ["uv run ruff check --fix", "uv run ruff format"],
  // Prettier and Autocorrect for all files (autocorrect is mise-managed, on PATH)
  "**/*": ["pnpm exec prettier --write --ignore-unknown", "autocorrect --fix"],
};
