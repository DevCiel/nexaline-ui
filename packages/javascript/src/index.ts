import { Dialog } from './dialog';
import { Drawer } from './drawer';
import { targetFrom } from './shared';
import { Disclosure } from './disclosure';
import { Tabs } from './tabs';
import { Dropdown } from './dropdown';
export { Dialog } from './dialog';
export { Drawer } from './drawer';
export { ThemePreference, type Theme } from './theme';
export { Disclosure } from './disclosure';
export { Tabs } from './tabs';
export { Dropdown } from './dropdown';
export { Toast, type ToastOptions } from './toast';

export interface NexalineInstance { destroy(): void; }
const triggerBindings=new WeakMap<HTMLElement,{uses:number;listener:EventListener}>();
type Component=Dialog|Drawer|Disclosure|Tabs|Dropdown;
const componentUses=new WeakMap<Component,number>();
function acquire(component:Component){componentUses.set(component,(componentUses.get(component)??0)+1);return()=>{const uses=(componentUses.get(component)??1)-1;if(uses<=0){componentUses.delete(component);component.destroy()}else componentUses.set(component,uses)}}

function bindToggle(trigger:HTMLElement){
  const existing=triggerBindings.get(trigger);if(existing){existing.uses++;return()=>releaseToggle(trigger)}
  const listener=()=>{const target=targetFrom(trigger);if(!target)return;if(trigger.dataset.nxToggle==='dialog'&&target instanceof HTMLDialogElement)new Dialog(target).open(trigger);if(trigger.dataset.nxToggle==='drawer')new Drawer(target).open(trigger)};
  trigger.addEventListener('click',listener);triggerBindings.set(trigger,{uses:1,listener});return()=>releaseToggle(trigger);
}
function releaseToggle(trigger:HTMLElement){const binding=triggerBindings.get(trigger);if(!binding)return;if(--binding.uses===0){trigger.removeEventListener('click',binding.listener);triggerBindings.delete(trigger)}}

export function init(root: ParentNode = document): NexalineInstance {
  const releases:Array<()=>void>=[];
  root.querySelectorAll<HTMLDialogElement>('dialog[data-nx-dialog]').forEach((el) => releases.push(acquire(new Dialog(el))));
  root.querySelectorAll<HTMLElement>('[data-nx-drawer]').forEach((el) => releases.push(acquire(new Drawer(el))));
  root.querySelectorAll<HTMLElement>('[data-nx-collapse]').forEach((el) => { const trigger=root.querySelector<HTMLButtonElement>(`[data-nx-target="#${CSS.escape(el.id)}"]`)??undefined;if(trigger)releases.push(acquire(new Disclosure(el,trigger))); });
  root.querySelectorAll<HTMLElement>('[data-nx-tabs]').forEach((el) => releases.push(acquire(new Tabs(el))));
  root.querySelectorAll<HTMLElement>('[data-nx-dropdown]').forEach((el) => releases.push(acquire(new Dropdown(el))));
  root.querySelectorAll<HTMLElement>('[data-nx-toggle="dialog"],[data-nx-toggle="drawer"]').forEach((trigger) => {
    releases.push(bindToggle(trigger));
  });
  return { destroy() { releases.splice(0).forEach(release=>release()); } };
}

export const version = '0.1.0-beta.0';

declare global { interface Window { NexalineUI?: { Dialog: typeof Dialog; Drawer: typeof Drawer; Disclosure:typeof Disclosure; Tabs:typeof Tabs; Dropdown:typeof Dropdown; init: typeof init; version: string } } }
if (typeof window !== 'undefined') window.NexalineUI = { Dialog, Drawer, Disclosure, Tabs, Dropdown, init, version };
