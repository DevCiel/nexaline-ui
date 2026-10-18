# Third-party development dependencies

Nexaline UI runtime CSS and JavaScript have no third-party runtime dependency. The following tools are development-only and are not bundled into the framework runtime.

| Dependency | Resolved version | License | Purpose | Runtime bundle impact |
| --- | ---: | --- | --- | --- |
| `@axe-core/playwright` | 4.14.0 | MPL-2.0 | Automated browser accessibility checks | None |
| `@lucide/icons` | 1.59.0 | ISC | Type-check and test the optional icon-data adapter | Icons are consumer-selected and never bundled by Nexaline |
| `@playwright/test` | 1.64.1 | Apache-2.0 | Keyboard, responsive, and visual browser tests | None |
| `esbuild` | 0.25.12 | MIT | CSS/TypeScript distribution bundling and minification | Emits framework code; bundler itself is absent |
| `jsdom` | 27.4.0 | MIT | DOM environment for unit tests | None |
| `typescript` | 5.9.3 | Apache-2.0 | Static checking and declaration generation | None |
| `vite` | 7.3.7 | MIT | Static documentation development and production build | None in framework assets |
| `vitest` | 4.1.12 | MIT | Unit-test runner | None |

No positioning library is currently used. Dropdown placement intentionally uses bounded CSS positioning; a future collision-aware helper must be justified and documented before addition.
