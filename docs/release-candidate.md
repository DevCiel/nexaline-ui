# 0.1.0-beta.0 local release candidate

The requirement-by-requirement evidence map is maintained in `docs/specification-coverage.md`.

## Acceptance status

- No Bootstrap, Tailwind, jQuery, React, or Vue dependency.
- Components and utilities consume the same semantic tokens and namespace.
- Full, minified, modular, and no-reset CSS assets build successfully.
- ESM, CommonJS, browser IIFE, declarations, and source maps are present.
- Compiled assets work from static HTML without a Node.js runtime.
- An isolated fixture installs and imports the actual local tarball.
- Interactive components cover lifecycle events, repeated initialization, cleanup, keyboard use, focus placement, focus return, and canceled transitions.
- Light, dark, system preference, compact density, reduced motion, LTR, and RTL are implemented.
- Automated responsive, accessibility, and focused visual checks cover 320, 375, 768, 1024, and 1440 pixels.
- HTML, PHP, CodeIgniter, and Laravel integration markup is included.
- The optional `@nexaline-ui/icons-lucide` package is isolated from core and tested with real tree-shakeable Lucide icon data.
- Bundle sizes are measured rather than estimated.
- A machine-checked contract inventory covers all 38 initial catalogue entries, including markup, variants, states, accessibility, JavaScript, and customization tokens.
- Package and documentation builds consume one explicit browser-target policy; current-engine automation is not represented as oldest-version evidence.
- Token and bounded-utility sources are generated deterministically from shared definitions, with a pre-build CI drift check.
- All five local package tarballs have deterministic SHA-256 and byte-size records in `release/manifest.json`, verified before consumer installation.

## Known beta limitations

- Package names returned npm registry `E404` on 2026-10-18 but remain provisional and unreserved; organization-scope ownership is not established.
- Bootable CodeIgniter 4.7 and Laravel 12 fixtures verify CSRF-protected validation and compiled assets in Chromium, Firefox, and WebKit; the concise `examples/` templates remain copyable integration snippets.
- Manual screen-reader, native Windows High Contrast, physical touch-device, and native Safari/Firefox review remains required; browser and forced-colors emulation do not establish conformance.
- Documentation behavior and accessibility automation runs in Chromium, Firefox, and WebKit; visual pixel baselines remain Windows Chromium-specific.
- Tooltip placement is intentionally simple and does not perform viewport collision detection.
- Documentation groups related live examples on catalogue pages and provides one audited inventory rather than maintaining 38 separate routes.
- Visual baselines are platform-specific Chromium references and should be reviewed when fonts or rendering environments change.
- The pre-1.0 API is experimental and may change with documented migration notes.

No package, release, or documentation site has been published or deployed.
