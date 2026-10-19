# Nexaline UI

[![CI](https://github.com/DevCiel/nexaline-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/DevCiel/nexaline-ui/actions/workflows/ci.yml)
[![npm beta](https://img.shields.io/npm/v/nexaline-ui/beta)](https://www.npmjs.com/package/nexaline-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An experimental, dependency-light CSS and TypeScript framework for server-rendered and static HTML. It combines accessible components with a bounded utility system and has no Bootstrap, Tailwind, jQuery, React, or Vue dependency.

## Install

```bash
npm install nexaline-ui@beta
```

```js
import 'nexaline-ui/css';
import { init } from 'nexaline-ui';

init(document);
```

Modular packages are also available:

```bash
npm install @nexaline-ui/core@beta @nexaline-ui/components@beta @nexaline-ui/js@beta
```

## Documentation

- [Live documentation](https://devciel.github.io/nexaline-ui/)
- [Component catalogue](https://devciel.github.io/nexaline-ui/components.html)
- [Guides](https://devciel.github.io/nexaline-ui/guides.html)
- [Accessibility evidence](https://devciel.github.io/nexaline-ui/accessibility.html)
- [GitHub releases](https://github.com/DevCiel/nexaline-ui/releases)

## Development

Run `corepack pnpm install`, then `corepack pnpm check`. Use `corepack pnpm dev` for the local documentation and demo.

Token and bounded-utility CSS is generated from `config/tokens.mjs` and `config/utilities.mjs`. Run `corepack pnpm generate:css` after changing definitions and `corepack pnpm check:generated` to detect drift. Do not edit generated token or utility CSS directly.

The public API remains experimental until 1.0. See `docs/architecture.md` and the integration examples under `examples/`.
