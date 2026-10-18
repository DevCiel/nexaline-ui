# Nexaline UI

An experimental, dependency-light CSS and TypeScript framework for server-rendered and static HTML. It combines accessible components with a bounded utility system; it has no Bootstrap, Tailwind, jQuery, React, or Vue dependency.

## Quick start

```html
<link rel="stylesheet" href="dist/nexaline.css">
<script src="dist/nexaline.js" defer></script>
```

Run `corepack pnpm install`, then `pnpm check`. Use `pnpm dev` for the documentation and customer-management demo.

Token and bounded-utility CSS is generated from `config/tokens.mjs` and `config/utilities.mjs`. Run `corepack pnpm generate:css` after changing definitions and `corepack pnpm check:generated` to detect drift. Do not edit the generated token or utility CSS files directly.

The public API is experimental until 1.0. See `docs/architecture.md` and integration examples under `examples/`.

Package names currently do not resolve in read-only npm checks, but remain provisional and unreserved. Nothing is published by the build or release scripts.
