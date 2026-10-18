# Contributing to Nexaline UI

Nexaline UI is experimental before 1.0. Discuss broad public API changes before implementation; routine fixes can proceed with tests and documentation.

## Local setup

Use Node.js 22.12 or newer and the pinned pnpm version:

```text
corepack pnpm install
corepack pnpm check
```

`check` runs static types, unit tests, production builds, five-viewport Chromium checks, Firefox/WebKit behavior and accessibility checks, served HTML/PHP fixtures, visual tests, package inspection, four local package archives, isolated consumer installation, and bundle-size reporting.

## Public API rules

- Prefix public classes, variables, attributes, events, keyframes, and storage keys with the documented Nexaline namespaces.
- Use semantic tokens rather than component-local literal colors or spacing unless the value is intrinsic.
- Keep selectors low-specificity and avoid `!important` except accessibility utilities or unavoidable platform overrides.
- Do not add arbitrary utility values, source scanning, or a full dependency for a narrow problem.
- Interactive components require semantics, keyboard behavior, focus handling, cancelable lifecycle events where useful, repeated initialization safety, and cleanup.
- Update documentation, declarations, tests, snapshots, bundle measurements, and the changelog when applicable.

## Visual changes

Run `corepack pnpm test:visual` first. If the change is intentional, run `corepack pnpm test:visual:update`, inspect every changed image, and rerun normal comparison. Baselines are Windows Chromium references.

## Releases

Local archives are created by `corepack pnpm pack:local`. Do not publish, deploy, create a hosted release, or claim package-name ownership without explicit authorization. Breaking beta changes require migration notes.
