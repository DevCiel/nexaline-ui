import { emit, focusable, type Trigger } from './shared';

const instances = new WeakMap<HTMLDialogElement, Dialog>();
export interface DialogOptions { closeOnBackdrop?: boolean; }

export class Dialog {
  readonly element!: HTMLDialogElement;
  private trigger: Trigger = null;
  private options!: Required<DialogOptions>;
  private abort = new AbortController();

  constructor(element: HTMLDialogElement, options: DialogOptions = {}) {
    const current = instances.get(element); if (current) return current;
    this.element = element; this.options = { closeOnBackdrop: options.closeOnBackdrop ?? true };
    element.addEventListener('cancel', (event) => { event.preventDefault(); this.close(); }, { signal: this.abort.signal });
    element.addEventListener('click', (event) => { if (this.options.closeOnBackdrop && event.target === element) this.close(); }, { signal: this.abort.signal });
    element.querySelectorAll('[data-nx-dismiss]').forEach((node) => node.addEventListener('click', () => this.close(), { signal: this.abort.signal }));
    instances.set(element, this);
  }
  open(trigger: Trigger = null) { if (this.element.open || !emit(this.element,'beforeopen',this,trigger,true)) return; this.trigger = trigger ?? document.activeElement as HTMLElement; this.element.showModal(); queueMicrotask(() => this.element.querySelector<HTMLElement>('[autofocus],'+focusable)?.focus()); emit(this.element,'open',this,this.trigger); }
  close() { if (!this.element.open || !emit(this.element,'beforeclose',this,this.trigger,true)) return; this.element.close(); emit(this.element,'close',this,this.trigger); this.trigger?.focus(); this.trigger = null; }
  destroy() { if (this.element.open) this.element.close(); this.abort.abort(); instances.delete(this.element); }
  static get(element: HTMLDialogElement) { return instances.get(element); }
}
