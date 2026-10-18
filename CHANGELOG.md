# Changelog

## 0.1.0-beta.0 — 2026-10-18

- Added experimental token, foundation, layout, utility, component, and JavaScript packages.
- Added light/dark/system themes, density controls, RTL-aware layout, and reduced-motion behavior.
- Added buttons, fields, cards, badges, dialog, drawer, and customer-management demo.
- Added compiled modular/full/no-reset CSS, ESM/CJS/browser JavaScript, declarations, source maps, integration examples, unit tests, Playwright checks, and accessibility automation.
- Expanded the catalogue with native form controls, content, feedback, navigation, tabs, accordion/collapsible, dropdown, tooltip, toast, and loading patterns.
- Hardened repeated initialization with reference-counted ownership and added complete tabs, accordion, and dropdown keyboard behavior.
- Added isolated packed-package consumption and no-build asset-path verification.
- Completed the static guide site and five-viewport responsive matrix; closed drawers now use native `inert` to remove hidden controls from keyboard and accessibility navigation.
- Added focused visual regression coverage, third-party development notices, and a formal local release-candidate acceptance report.
- Corrected modular CSS boundaries so core excludes utilities, and added source maps for every CSS distribution build.
- Made the core, component, and JavaScript workspace packages independently packable and verified their real tarball exports in the isolated consumer.
- Added a least-privilege Windows CI release gate, contribution and security policies, and a dated read-only npm package-name status record.
- Added Firefox and WebKit documentation coverage plus PHP-served HTML/PHP integration tests; corrected the PHP fixture's responsive metadata and semantic heading.
- Centralized the declared browser floor across package and documentation builds and documented the boundary between current-engine automation and minimum-version support.
- Added deterministic token and bounded-utility CSS generation with committed outputs and a CI drift guard.
- Added a verified local release manifest with SHA-256 checksums and byte sizes for all five package tarballs.

All public APIs remain experimental before 1.0. Breaking beta changes will be listed here with migration instructions.
