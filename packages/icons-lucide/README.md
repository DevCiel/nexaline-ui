# @nexaline-ui/icons-lucide

Optional DOM adapter for tree-shakeable `@lucide/icons` data. Nexaline UI does not bundle an icon set.

```ts
import { CircleCheckBig } from '@lucide/icons';
import { createLucideIcon } from '@nexaline-ui/icons-lucide';
button.prepend(createLucideIcon(CircleCheckBig));
status.append(createLucideIcon(CircleCheckBig, { decorative: false, label: 'Complete' }));
```

Decorative icons are hidden from assistive technology. Informative icons require a non-empty label. Keep button text or an `aria-label`; an icon does not name its parent control.
