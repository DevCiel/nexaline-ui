# JavaScript API and events

Nexaline JavaScript is optional. Import only what an interaction needs, or call `init(root)` for declarative markup. Initializing the same root repeatedly shares component and trigger ownership; each returned handle releases only its own references when destroyed. Dynamic content is initialized explicitly with `init(fragment)`—no permanent observer runs.

## Constructors

- `Dialog(element, options)` — `open(trigger)`, `close()`, `destroy()`
- `Drawer(element)` — `open(trigger)`, `close()`, `destroy()`
- `Disclosure(panel, trigger)` — `open()`, `close()`, `toggle()`, `destroy()`
- `Tabs(element)` — `select(index)`, `destroy()`
- `Dropdown(element)` — `open(focus?)`, `close(returnFocus?)`, `toggle()`, `destroy()`
- `Toast(message, options)` — `destroy()`; `Toast.show()` is shorthand
- `ThemePreference.apply(theme, persist?)` and `ThemePreference.restore()`

## Events

Opening components dispatch cancelable `nx:beforeopen`; closing components dispatch cancelable `nx:beforeclose`. Successful operations then dispatch `nx:open` or `nx:close`. Tabs dispatch cancelable `nx:beforechange`, followed by `nx:change`. Events bubble and expose `{ component, trigger }` in `event.detail`.

## Keyboard contract

Dialogs and drawers close with Escape and return focus. Drawers trap Tab while open. Tabs use Left/Right/Home/End with RTL-aware direction. Accordion headers use Up/Down/Home/End. Dropdown menus use Up/Down/Home/End, Escape, outside-pointer close, and focus return. Disabled menu items marked `aria-disabled="true"` are skipped.

## Cleanup

`destroy()` removes listeners and timers, restores document scrolling where applicable, removes generated backdrops, and clears instance registries. Toast timers are always cleared. Application code should destroy the handle returned by `init` when removing an initialized subtree.
