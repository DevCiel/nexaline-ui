# Accessibility review

Automated checks cover serious and critical axe findings, keyboard flows, focus return, 320 CSS pixel reflow, forced-colors focus, reduced motion, a 24 CSS pixel target-size floor, themes, and RTL. The main matrix uses Chromium at five widths plus Firefox and WebKit; touch-specific evidence uses an emulated iPhone viewport. Run `pnpm test:accessibility` for the dedicated evidence suite. Automated results do not establish complete conformance.

## Evidence status — 19 October 2026

| Area | Automated evidence | Human evidence |
| --- | --- | --- |
| Semantics and names | axe serious/critical checks passing | NVDA with Firefox and Chrome, plus physical Android TalkBack, passed the recorded task scripts |
| Keyboard and focus | Component flows and focus return passing | NVDA/Firefox and NVDA/Chrome keyboard, focus, overlay, disclosure, and menu checks passed |
| Reflow and zoom proxy | 320 CSS pixel layouts passing | Firefox and Chrome passed 200% and 400% zoom/reflow review |
| Forced colors | Emulated focus and overlay flow passing | Native Windows High Contrast passed in Chrome and Firefox |
| Reduced motion | Animation and transition collapse passing | Windows reduced-motion review passed in Firefox and Chrome |
| Touch targets | Nexaline controls meet 24 × 24 CSS pixel floor in emulation | OnePlus Nord CE 3 5G with Android 15, Chrome 155.0.8059.79, and TalkBack 17.0 passed portrait/landscape physical-device review |

No WCAG, Section 508, EN 301 549, or legal conformance claim is made.

Manual release review should include:

- Navigate every interactive example using only a keyboard.
- Confirm visible focus in light, dark, and forced-colors modes.
- Check dialog and drawer announcement, focus placement, containment, Escape, and return.
- Check tabs, accordion, and menu behavior against their documented keyboard contract.
- Test labels, errors, live regions, disabled states, zoom, and reflow with current screen readers.
- Confirm tooltips duplicate non-essential information and work on focus as well as hover.
- Inspect contrast after any brand-token override.
- Test reduced-motion and touch targets on physical devices.

Use `docs/manual-accessibility-protocol.md` as the canonical result worksheet. It defines seven required native environments, twelve task scripts, evidence fields, result codes, and release exit criteria. Its current status is **Complete with documented blockers**: four environments passed, while JAWS/Chrome, macOS VoiceOver/Safari, and physical iOS VoiceOver/Safari remain blocked by unavailable native platforms. These limitations prevent a formal conformance claim.
