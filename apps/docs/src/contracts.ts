export type ComponentContract = {
  group: string;
  name: string;
  selector: string;
  variants: string;
  states: string;
  accessibility: string;
  javascript: string;
  tokens: string;
};

const cssOnly = 'None; semantic HTML remains functional';
const sharedTokens = 'color, space, radius, type, shadow';

export const componentContracts: ComponentContract[] = [
  {group:'Foundation',name:'Typography',selector:'h1–h6, .nx-text-*',variants:'Scale and muted text',states:'Default',accessibility:'Keep a logical heading order.',javascript:cssOnly,tokens:'type, color'},
  {group:'Foundation',name:'Links',selector:'a, .nx-link',variants:'Inline and standalone',states:'hover, focus, visited',accessibility:'Use meaningful link text.',javascript:cssOnly,tokens:'color, focus'},
  {group:'Foundation',name:'Separators',selector:'hr, .nx-divider',variants:'Horizontal',states:'Default',accessibility:'Decorative separators need no label.',javascript:cssOnly,tokens:'color-border, space'},
  {group:'Foundation',name:'Containers',selector:'.nx-container',variants:'Responsive max width',states:'Default',accessibility:'Does not replace a landmark element.',javascript:cssOnly,tokens:'container, space'},
  {group:'Actions',name:'Buttons',selector:'.nx-btn',variants:'primary, secondary, danger, sizes',states:'hover, focus, active, disabled, loading',accessibility:'Use button for actions and a link for navigation.',javascript:cssOnly,tokens:sharedTokens},
  {group:'Actions',name:'Button groups',selector:'.nx-btn-group',variants:'Attached actions',states:'Child button states',accessibility:'Give the group an accessible label.',javascript:cssOnly,tokens:'space, radius, color-border'},
  {group:'Actions',name:'Icon buttons',selector:'.nx-icon-btn',variants:'Neutral and contextual',states:'hover, focus, disabled',accessibility:'An accessible name is required.',javascript:cssOnly,tokens:'control-size, color, focus'},
  {group:'Forms',name:'Input',selector:'.nx-input',variants:'Text input types',states:'focus, disabled, readonly, invalid',accessibility:'Associate a visible label and described help/error.',javascript:cssOnly,tokens:'control, color, radius, focus'},
  {group:'Forms',name:'Textarea',selector:'.nx-textarea',variants:'Resizable multiline',states:'focus, disabled, readonly, invalid',accessibility:'Associate label and error text.',javascript:cssOnly,tokens:'control, color, radius, focus'},
  {group:'Forms',name:'Select',selector:'.nx-select',variants:'Single select',states:'focus, disabled, invalid',accessibility:'Use a label; retain the native select.',javascript:cssOnly,tokens:'control, color, radius, focus'},
  {group:'Forms',name:'Checkbox',selector:'.nx-check',variants:'Labelled control',states:'checked, focus, disabled, indeterminate',accessibility:'Keep the native input in the label.',javascript:cssOnly,tokens:'control, color, focus'},
  {group:'Forms',name:'Radio',selector:'.nx-radio',variants:'Labelled control',states:'checked, focus, disabled',accessibility:'Group related radios in a labelled fieldset.',javascript:cssOnly,tokens:'control, color, focus'},
  {group:'Forms',name:'Switch',selector:'.nx-switch',variants:'Labelled toggle',states:'checked, focus, disabled',accessibility:'Use role="switch" and a visible label.',javascript:cssOnly,tokens:'control, color, radius, focus'},
  {group:'Forms',name:'Field groups',selector:'.nx-field',variants:'Stacked label/control/help',states:'valid and invalid',accessibility:'Preserve label, control, and description relationships.',javascript:cssOnly,tokens:'space'},
  {group:'Forms',name:'Help text',selector:'.nx-field__help',variants:'Neutral guidance',states:'Default',accessibility:'Reference it with aria-describedby.',javascript:cssOnly,tokens:'type, color-muted'},
  {group:'Forms',name:'Validation messages',selector:'.nx-field__error',variants:'Error guidance',states:'Visible after validation',accessibility:'Set aria-invalid and reference the message.',javascript:cssOnly,tokens:'type, color-danger'},
  {group:'Content',name:'Cards',selector:'.nx-card',variants:'Header, body, footer',states:'Default',accessibility:'Choose an article or section element when meaningful.',javascript:cssOnly,tokens:sharedTokens},
  {group:'Content',name:'Avatars',selector:'.nx-avatar',variants:'Image or initials',states:'Default',accessibility:'Use useful alt text or mark decorative.',javascript:cssOnly,tokens:'size, radius, color'},
  {group:'Content',name:'Badges',selector:'.nx-badge',variants:'neutral, success, warning, danger',states:'Default',accessibility:'Do not communicate status by color alone.',javascript:cssOnly,tokens:'color, type, radius'},
  {group:'Content',name:'Lists',selector:'.nx-list',variants:'Divided and plain',states:'Default',accessibility:'Retain ul/ol semantics.',javascript:cssOnly,tokens:'space, color-border'},
  {group:'Content',name:'Tables',selector:'.nx-table',variants:'Striped and compact',states:'Row hover',accessibility:'Use captions, scoped headers, and a named scroll region.',javascript:cssOnly,tokens:'space, type, color-border'},
  {group:'Content',name:'Empty states',selector:'.nx-empty',variants:'Message with optional action',states:'Default',accessibility:'Use a clear heading and actionable recovery text.',javascript:cssOnly,tokens:'space, type, color-muted'},
  {group:'Content',name:'Timelines',selector:'.nx-timeline',variants:'Ordered events',states:'Current event',accessibility:'Use an ordered list and text labels.',javascript:cssOnly,tokens:'space, color-border'},
  {group:'Feedback',name:'Alerts',selector:'.nx-alert',variants:'info, success, warning, danger',states:'Static or newly inserted',accessibility:'Use alert only for urgent dynamic messages.',javascript:cssOnly,tokens:'color, space, radius'},
  {group:'Feedback',name:'Spinners',selector:'.nx-spinner',variants:'Inline',states:'Busy',accessibility:'Provide status text or mark decorative.',javascript:cssOnly,tokens:'size, color, motion'},
  {group:'Feedback',name:'Progress',selector:'.nx-progress',variants:'Determinate native progress',states:'0–100',accessibility:'Provide an accessible label.',javascript:cssOnly,tokens:'size, color, radius'},
  {group:'Feedback',name:'Skeletons',selector:'.nx-skeleton',variants:'Text and block',states:'Loading',accessibility:'Hide decoration and mark the region busy.',javascript:cssOnly,tokens:'color, radius, motion'},
  {group:'Feedback',name:'Toasts',selector:'.nx-toast',variants:'polite and assertive',states:'entering, visible, leaving',accessibility:'Use the appropriate live-region priority.',javascript:'Toast.show(message, options); destroy()',tokens:'color, space, radius, shadow, motion'},
  {group:'Navigation',name:'Breadcrumbs',selector:'.nx-breadcrumb',variants:'Current-page trail',states:'Current item',accessibility:'Wrap in a labelled nav and use aria-current.',javascript:cssOnly,tokens:'space, type, color'},
  {group:'Navigation',name:'Pagination',selector:'.nx-pagination',variants:'Previous, pages, next',states:'current, disabled',accessibility:'Label navigation and mark the current page.',javascript:cssOnly,tokens:'control, space, color, radius'},
  {group:'Navigation',name:'Tabs',selector:'[data-nx-tabs]',variants:'Manual activation',states:'selected, focus, disabled',accessibility:'Use tablist/tab/tabpanel roles and arrow keys.',javascript:'Tabs.select(index); destroy(); init(root)',tokens:'color, space, focus'},
  {group:'Navigation',name:'Navbar',selector:'.nx-navbar',variants:'Responsive navigation',states:'Current link',accessibility:'Use a labelled nav and aria-current.',javascript:cssOnly,tokens:'container, space, color-border'},
  {group:'Overlays and disclosure',name:'Dialog',selector:'[data-nx-dialog]',variants:'Modal dialog',states:'open and closed',accessibility:'Name it, contain focus, close on Escape, restore focus.',javascript:'Dialog.open(); close(); destroy(); init(root)',tokens:'surface, space, radius, shadow, motion'},
  {group:'Overlays and disclosure',name:'Drawer',selector:'[data-nx-drawer]',variants:'Logical inline edge',states:'open and closed',accessibility:'Name it, contain focus, make background inert.',javascript:'Drawer.open(); close(); destroy(); init(root)',tokens:'surface, space, shadow, motion'},
  {group:'Overlays and disclosure',name:'Dropdown',selector:'[data-nx-dropdown]',variants:'Action menu',states:'open, closed, focused item',accessibility:'Expose expanded state; support arrows, Home, End, Escape.',javascript:'Dropdown.open(); close(); toggle(); destroy()',tokens:'surface, space, radius, shadow, focus'},
  {group:'Overlays and disclosure',name:'Tooltip',selector:'.nx-tooltip',variants:'Text tooltip',states:'hover and focus',accessibility:'Reference tooltip text with aria-describedby.',javascript:'Optional consumer positioning only',tokens:'surface-inverse, type, space, radius'},
  {group:'Overlays and disclosure',name:'Accordion',selector:'.nx-accordion',variants:'Single or multiple panels',states:'expanded and collapsed',accessibility:'Synchronize aria-expanded and panel visibility; support heading keys.',javascript:'Disclosure.open(); close(); toggle(); destroy()',tokens:'space, color-border, focus'},
  {group:'Overlays and disclosure',name:'Collapsible',selector:'[data-nx-collapse]',variants:'Generic disclosure',states:'expanded and collapsed',accessibility:'Trigger identifies target and exposes aria-expanded.',javascript:'Disclosure.open(); close(); toggle(); destroy()',tokens:'space, motion'},
];

export function renderComponentContracts(root: HTMLElement): void {
  root.innerHTML = componentContracts.map((item) => `<tr data-component-contract>
    <th scope="row"><strong>${item.name}</strong><br><small>${item.group}</small></th>
    <td><code>${item.selector}</code><br><small>${item.variants}</small></td>
    <td>${item.states}</td><td>${item.accessibility}</td><td><code>${item.javascript}</code></td><td>${item.tokens}</td>
  </tr>`).join('');
}

export const componentSlug = (item: ComponentContract): string => item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function renderComponentDetails(root: HTMLElement, contracts: ComponentContract[] = componentContracts): void {
  root.innerHTML = contracts.map((item) => `<article class="nx-card docs-contract-card" id="${componentSlug(item)}" data-component-detail data-component-group="${item.group}">
    <header class="nx-card__header"><p class="docs-eyebrow">${item.group}</p><h2 class="nx-mb-0"><a href="#${componentSlug(item)}">${item.name}</a></h2></header>
    <div class="nx-card__body nx-stack">
      <dl class="docs-contract-fields">
        <div><dt>Selector</dt><dd><code>${item.selector}</code></dd></div>
        <div><dt>Variants</dt><dd>${item.variants}</dd></div>
        <div><dt>States</dt><dd>${item.states}</dd></div>
        <div><dt>Accessibility</dt><dd>${item.accessibility}</dd></div>
        <div><dt>JavaScript</dt><dd><code>${item.javascript}</code></dd></div>
        <div><dt>Tokens</dt><dd>${item.tokens}</dd></div>
      </dl>
      <p class="nx-text-muted">See the <a href="./components.html">live catalogue</a> and <a href="./reference.html">copyable reference</a> for rendered usage.</p>
    </div>
  </article>`).join('');
}
