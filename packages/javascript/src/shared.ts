export type Trigger = HTMLElement | null;
export const focusable = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
export function emit(element: Element, name: string, component: object, trigger: Trigger, cancelable = false) {
  return element.dispatchEvent(new CustomEvent(`nx:${name}`, { bubbles: true, cancelable, detail: { component, trigger } }));
}
export function targetFrom(trigger: Element): HTMLElement | null {
  const selector = trigger.getAttribute('data-nx-target');
  if (!selector) return null;
  try { return document.querySelector<HTMLElement>(selector); } catch { return null; }
}
