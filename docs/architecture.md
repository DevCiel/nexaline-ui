# Architecture and public conventions

## Compatibility

Nexaline targets Chrome/Edge 111+, Firefox 114+, and Safari/iOS 16.4+. This is an explicit framework policy shared by package and documentation builds, not an inherited bundler default. Current Playwright engines provide regression coverage; they do not prove the oldest supported versions. JavaScript is progressively enhanced, so core HTML and CSS remain useful without it. See `docs/browser-support.md` for evidence boundaries.

## Names and layers

Public classes use `nx-*`, custom properties `--nx-*`, behavior attributes `data-nx-*`, events `nx:*`, keyframes `nx-*`, and the browser namespace `NexalineUI`. Layers are ordered `nx-reset`, `nx-base`, `nx-layout`, `nx-components`, `nx-utilities`. Applications can override in a later layer or unlayered stylesheet. Selectors stay low-specificity; utilities do not use `!important`.

## Tokens and themes

Primitive scales feed semantic color, type, spacing, radius, shadow, motion, z-index, and density tokens. Light is default; `data-nx-theme="dark"` selects dark and `system` follows system preference. `data-nx-density="compact"` reduces control density. Logical properties support LTR and RTL.

Token values are declared in `config/tokens.mjs`; the bounded utility catalogue and responsive allowlists are declared in `config/utilities.mjs`. `scripts/generate-css.mjs` deterministically writes the public token and utility CSS sources. Run `pnpm generate:css` after changing definitions and `pnpm check:generated` to detect drift. The release gate runs the drift check before any build can refresh generated files.

## Layout and utilities

Build-time breakpoints are `sm` 36rem, `md` 48rem, `lg` 64rem, `xl` 90rem. Bounded utilities have deterministic source order; later declarations win and HTML class order has no effect. Only selected `md` and `lg` layout/visibility variants are included. Colons are escaped in CSS.

## Components and JavaScript

Blocks use `.nx-card`, elements `.nx-card__body`, modifiers `.nx-btn--primary`, and native state attributes first. Constructors map each element to one live instance. `init(root)` is scoped, returns a disposable group, and installs no MutationObserver; call it explicitly after inserting content. Components emit cancelable `nx:beforeopen` / `nx:beforeclose`, then `nx:open` / `nx:close`, with `{ component, trigger }` in event detail. `destroy()` removes listeners and registry entries.

Dialogs place focus inside, trap Tab, close on Escape/backdrop, use the native modal dialog model, and return focus. Drawers provide equivalent focus/Escape handling with a backdrop. Reduced motion makes transitions immediate.

## Distribution

The aggregate package provides ESM, an IIFE browser bundle, declarations, source maps, full/core/component/utility/no-reset CSS, and CSS side-effect metadata. Core contains tokens, reset, base, and layout. Component and utility builds depend on core tokens. No-reset omits global reset selectors.

## Accessibility and CSP

Examples use semantic controls, labels, live validation, visible focus, keyboard behavior, focus return, comfortable touch targets, reduced motion, and theme contrast. Automated checks supplement manual keyboard and assistive-technology review. To prevent theme flash under strict CSP, server-render `data-nx-theme`; optional persistence uses validated values and `nx:v1:theme`, never mandatory storage.
