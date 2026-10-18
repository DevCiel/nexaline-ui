# Distribution and consumption

Nexaline is distributed as an experimental pre-1.0 package. The package name is provisional; no registry availability claim is made and nothing is published automatically.

## Compiled, no build tool

Copy `nexaline.min.css` and `nexaline.min.js` to a public directory and reference them with ordinary `link` and `script` elements. The browser bundle exposes `window.NexalineUI`. A Node.js server is not required; the assets work from Apache, nginx, a CDN, or a static host.

## Package import

```js
import { Dialog, init } from 'nexaline-ui';
import 'nexaline-ui/css';
```

CSS subpath exports are `core.css`, `components.css`, `utilities.css`, and `no-reset.css`. Components and utilities expect the semantic tokens in the core build. The full and no-reset builds already combine their dependencies.

The source workspace also produces focused `@nexaline-ui/js` entries for `dialog`, `drawer`, `disclosure`, `tabs`, `dropdown`, `toast`, and `theme`. They do not import unrelated components.

The local release candidate includes independently packable `@nexaline-ui/core`, `@nexaline-ui/components`, and `@nexaline-ui/js` archives. Components declare core as a peer because their semantic variables and layer order come from the foundation package.

## Artifacts

- `nexaline.css` / `nexaline.min.css`: full styles
- `nexaline-core.css`: tokens, reset, base, and layout
- `nexaline-components.css`: components; requires core tokens
- `nexaline-utilities.css`: bounded utilities; requires core tokens
- `nexaline-no-reset.css`: full styles without global reset selectors
- `nexaline.es.js`: named ES-module exports
- `nexaline.cjs`: CommonJS compatibility build
- `nexaline.js` / `nexaline.min.js`: browser IIFE build
- `index.d.ts`: TypeScript declarations
- `*.map`: development source maps for JavaScript and every CSS build

`sideEffects` marks CSS so bundlers retain explicit style imports. The release test installs the generated tarball into an isolated fixture and imports its real package exports rather than importing workspace source.

## Compatibility and integrity

Use the lockfile for reproducible development installs. Before release, run type checks, unit and browser tests, the production build, package verification, the isolated consumer fixture, size reporting, and manual accessibility review. Package publication and documentation deployment require explicit authorization.

`pnpm pack:local` creates the five local package tarballs. Run `pnpm release:manifest` immediately afterward to write `release/manifest.json`; it records the exact package name, version, filename, byte size, and SHA-256 digest for every artifact. `pnpm verify:release` recomputes those values and fails if a tarball is missing or changed. The complete release gate performs both steps before isolated-consumer verification.

## Optional icons

Install `@nexaline-ui/icons-lucide` with `@lucide/icons` when a project wants Lucide icon data rendered without a frontend framework. The adapter is separate from the aggregate package, icons remain consumer-selected and tree-shakeable, and Nexaline's default runtime remains icon-free.
