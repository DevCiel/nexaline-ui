# Manual accessibility review protocol

This document is the source worksheet for human review of Nexaline UI `0.1.0-beta.0`. Automated results are recorded separately in `docs/accessibility-review.md`. Do not replace `Not run` with `Pass` without completing the task in the named native environment and attaching reproducible evidence.

## Result vocabulary

- `Pass`: every expected result was observed.
- `Fail`: at least one expected result was not observed; an issue ID is required.
- `Blocked`: the task could not be completed; record the blocker and attempted workaround.
- `Not run`: no human result is available. This is the default.

## Session metadata

| Field | Value |
| --- | --- |
| Reviewer | Not assigned |
| Date and timezone | Not run |
| Nexaline version or commit | `0.1.0-beta.0` local candidate |
| Operating system and version | Not run |
| Browser and version | Not run |
| Assistive technology and version | Not run |
| Input hardware | Not run |
| Zoom, contrast, motion, and theme settings | Not run |

## Required environment matrix

| ID | Native environment | Status | Evidence |
| --- | --- | --- | --- |
| ENV-01 | Windows: current NVDA with current Firefox | Pass | `docs/accessibility-evidence/2026-10-19-env-01.md` |
| ENV-02 | Windows: current NVDA with current Chrome | Pass | `docs/accessibility-evidence/2026-10-19-env-02.md` |
| ENV-03 | Windows: current JAWS with current Chrome | Blocked | `docs/accessibility-evidence/2026-10-19-unavailable-environments.md` |
| ENV-04 | macOS: current VoiceOver with current Safari | Blocked | `docs/accessibility-evidence/2026-10-19-unavailable-environments.md` |
| ENV-05 | Windows: High Contrast with keyboard in Chrome and Firefox | Pass | `docs/accessibility-evidence/2026-10-19-env-05.md` |
| ENV-06 | iOS: VoiceOver with Safari on a physical touch device | Blocked | `docs/accessibility-evidence/2026-10-19-unavailable-environments.md` |
| ENV-07 | Android: TalkBack with Chrome on a physical touch device | Pass | `docs/accessibility-evidence/2026-10-19-env-07.md` |

“Current” means the version under support review on the test date. Record exact versions in session metadata.

## Task scripts

| ID | Task | Expected result | Status | Evidence / issue |
| --- | --- | --- | --- | --- |
| MAN-01 | Navigate every documentation landmark, heading, link, and control without a pointer. | Reading and focus order are meaningful; focus stays visible; no keyboard trap occurs. | Not run | — |
| MAN-02 | Open and close the dialog and drawer using their triggers, `Tab`, `Shift+Tab`, and `Escape`. | Name and role are announced; initial focus is sensible; focus is contained and returns to the trigger. | Not run | — |
| MAN-03 | Operate tabs, accordion, collapsible, and dropdown using only their documented keys. | State and selection are announced; arrow, Home, End, Enter, Space, and Escape behavior matches each contract. | Not run | — |
| MAN-04 | Submit the customer form empty or invalid, then correct it. | Error text is announced once, associated with the field, and recovery does not lose entered data. | Not run | — |
| MAN-05 | Trigger alerts, loading feedback, and a toast. | Urgent and polite messages use appropriate announcement priority without duplicate speech. | Not run | — |
| MAN-06 | Review the catalogue at 200% browser zoom, 400% zoom/reflow, and increased text size. | Content remains readable and operable without two-dimensional page scrolling or clipped controls. | Not run | — |
| MAN-07 | Review light, dark, and native High Contrast themes with keyboard focus. | Text, boundaries, selected states, validation, and focus remain distinguishable without color alone. | Not run | — |
| MAN-08 | Enable reduced motion and operate overlays, disclosures, spinner, and toast. | Necessary state changes remain perceivable and nonessential movement is removed. | Not run | — |
| MAN-09 | Use touch and mobile screen-reader gestures in portrait and landscape. | Targets are reachable, labelled, and operable; orientation changes preserve content and state. | Not run | — |
| MAN-10 | Switch the documentation to RTL and repeat navigation, form, menu, and overlay tasks. | Reading order, logical edges, keys, and focus behavior remain coherent. | Not run | — |
| MAN-11 | Override documented brand tokens and inspect text, controls, alerts, and focus indicators. | Contrast and non-color cues remain sufficient; no component bypasses semantic tokens. | Not run | — |
| MAN-12 | Follow links and controls using speech recognition or switch control where available. | Visible names match accessible names and all primary actions remain reachable. | Not run | — |

## Evidence requirements

For every `Pass`, record environment ID, task ID, reviewer, date, and concise observations. For every `Fail`, also record severity, exact reproduction steps, expected and actual behavior, screenshot or recording when useful, and an issue ID. Do not include personal or sensitive information in recordings.

## Release exit criteria

- Every required environment is `Pass` or has an accepted, documented `Blocked` rationale.
- Every task is completed in each applicable environment.
- No unresolved critical or high-severity accessibility issue remains.
- Medium and low issues have explicit disposition and release notes.
- A second reviewer verifies fixes for critical and high-severity issues.
- The release documentation continues to avoid a legal conformance claim unless a separate formal audit supports it.

Current manual status: **Complete with documented blockers**. ENV-01, ENV-02, ENV-05, and ENV-07 passed. ENV-03, ENV-04, and ENV-06 are blocked by unavailable native software or hardware and must be retested before any formal conformance claim.
