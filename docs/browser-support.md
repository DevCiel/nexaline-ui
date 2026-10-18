# Browser support policy

Nexaline UI `0.1.0-beta.0` declares a production floor of Chrome 111+, Edge 111+, Firefox 114+, and Safari/iOS 16.4+. The shared source of truth is `config/browser-support.mjs`; package and documentation builds consume its explicit targets.

## What the floor means

- Compiled JavaScript syntax is targeted to every declared engine.
- CSS, JavaScript, keyboard, RTL, theme, and responsive behavior are designed for the declared range.
- Current Playwright Chromium, Firefox, and WebKit builds run in CI as regression coverage.
- Semantic HTML and core content remain useful when JavaScript is unavailable.

## What the floor does not mean

- Current Playwright engines do not prove behavior in the oldest supported browser versions.
- WebKit automation is not a substitute for native Safari on macOS or iOS.
- Emulated touch, forced colors, reduced motion, and viewport sizes are not physical-device or native assistive-technology evidence.
- Browsers below the floor are not tested or supported; Nexaline does not ship legacy chunks or polyfills.

## Release evidence

Every release candidate must pass the current Chromium, Firefox, and WebKit automation matrix. Before a stable release, the oldest supported versions should receive a manual smoke test or the floor should be raised transparently. Native Safari, High Contrast, physical-device, and assistive-technology checks follow `docs/manual-accessibility-protocol.md`.

The floor is intentionally explicit rather than inherited from whichever Vite version happens to build the documentation. Changing it requires updating the shared policy, rebuilding packages and docs, running the release gate, and recording the change in the changelog.
