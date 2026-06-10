export default {
  // Oxlint + Oxfmt for the JS/TS family
  "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}": [
    "pnpm exec oxlint --fix",
    "pnpm exec oxfmt --no-error-on-unmatched-pattern",
  ],
  // Ruff for Python files
  "**/*.py": ["uv run --locked ruff check --fix", "uv run --locked ruff format"],
  // Prettier for docs and config file types
  "**/*.{md,mdx,markdown,json,jsonc,json5,yaml,yml,html,htm,css,scss,less,vue,graphql,gql,hbs,handlebars}":
    ["pnpm exec prettier --write --ignore-unknown"],
  // Autocorrect for all files (mise-managed, on PATH)
  "**/*": ["autocorrect --fix"],
};
