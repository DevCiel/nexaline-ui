import '../../../packages/core/src/index.css';
import '../../../packages/core/src/utilities/utilities.css';
import '../../../packages/components/src/components.css';
import { init, ThemePreference } from '../../../packages/javascript/src/index';
import { Toast } from '../../../packages/javascript/src/toast';
import './site.css';
import { componentContracts, componentSlug, renderComponentContracts, renderComponentDetails, renderComponentPage } from './contracts';

init(document);
const docsNav = document.querySelector<HTMLElement>('.docs-header nav[aria-label="Documentation"]');
if (docsNav && !docsNav.querySelector('a[href="./search.html"]')) {
  const searchLink = document.createElement('a');
  searchLink.href = './search.html';
  searchLink.textContent = 'Search';
  searchLink.setAttribute('aria-keyshortcuts', '/');
  docsNav.insertBefore(searchLink, docsNav.querySelector('button'));
}
type SearchEntry = { type:'guide'|'component'; title:string; description:string; href:string; keywords:string };
const guideEntries: SearchEntry[] = [
  ['Getting started','Install packages, CDN assets, starter template, required globals, browser support','./getting-started.html','installation npm pnpm package manager CDN starter globals'],
  ['Customization','Tokens, brand overrides, themes, density, cascade layers, RTL, and reduced motion','./customize.html','variables color modes dark light system no reset logical properties'],
  ['Layout and utilities','Containers, twelve-column grid, stack, cluster, breakpoints, and bounded utilities','./layout.html','responsive mobile first spacing columns utility order'],
  ['JavaScript APIs and events','Initialization, constructors, cancelable events, lifecycle, dynamic content, and teardown','./javascript.html','init destroy beforeopen beforeclose change browser bundle'],
  ['Forms and validation','Native controls, field relationships, validation summaries, timing, and server errors','./forms.html','input select textarea checkbox radio invalid aria describedby'],
  ['Framework integrations','Bundlers, HTML, PHP, CodeIgniter, Laravel, dynamic markup, and optional icons','./integrations.html','framework server rendered csrf blade lucide assets'],
  ['Browser support and migration','Supported versions, evidence boundaries, progressive enhancement, and beta upgrades','./browser-support.html','Chrome Edge Firefox Safari iOS changelog deprecated beta'],
  ['Starter projects','Download verified no-build HTML and Vite package starter projects','./starters.html','template scaffold download archive tgz npm CDN'],
  ['Component catalogue','Rendered component examples and interactive behavior','./components.html','preview examples catalogue controls feedback navigation'],
  ['Component details','Search every selector, state, accessibility contract, JavaScript method, and token surface','./component-details.html','contracts selectors states tokens methods accessibility'],
  ['Reference','Copyable component markup and JavaScript patterns','./reference.html','code examples dialog drawer tabs dropdown toast'],
  ['Accessibility evidence','Automated coverage, manual review boundaries, and accessibility responsibilities','./accessibility.html','axe screen reader keyboard forced colors reflow touch'],
  ['Manual accessibility review','Required native environments, task scripts, evidence, and release exit criteria','./manual-review.html','NVDA JAWS VoiceOver TalkBack high contrast physical device'],
  ['Guides and troubleshooting','Installation, tokens, layouts, JavaScript, integrations, troubleshooting, and changelog overview','./guides.html','build troubleshoot theme flash styles migration'],
].map(([title,description,href,keywords])=>({type:'guide',title,description,href,keywords} as SearchEntry));
const searchEntries: SearchEntry[] = [...guideEntries,...componentContracts.map((item)=>({type:'component' as const,title:item.name,description:`${item.group}. ${item.accessibility}`,href:`./component.html?component=${componentSlug(item)}`,keywords:Object.values(item).join(' ')}))];
const docsSearch = document.querySelector<HTMLInputElement>('#docs-search');
const docsSearchType = document.querySelector<HTMLSelectElement>('#docs-search-type');
const docsSearchResults = document.querySelector<HTMLElement>('#docs-search-results');
const docsSearchStatus = document.querySelector<HTMLElement>('#docs-search-status');
if (docsSearch && docsSearchType && docsSearchResults && docsSearchStatus) {
  const initial = new URLSearchParams(location.search);
  docsSearch.value = initial.get('q') ?? '';
  if (['guide','component'].includes(initial.get('type') ?? '')) docsSearchType.value = initial.get('type') ?? '';
  const renderSearch = (syncUrl = true) => {
    const terms = docsSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const type = docsSearchType.value;
    const matches = searchEntries.filter((entry)=>{
      const haystack = `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase();
      return (!type || entry.type === type) && terms.every((term)=>haystack.includes(term));
    });
    docsSearchResults.replaceChildren(...matches.map((entry)=>{
      const article=document.createElement('article'); article.className='nx-card docs-search-result'; article.dataset.searchResult='';
      const body=document.createElement('div'); body.className='nx-card__body nx-stack';
      const eyebrow=document.createElement('p'); eyebrow.className='docs-eyebrow nx-mb-0'; eyebrow.textContent=entry.type === 'component' ? 'Component' : 'Guide';
      const heading=document.createElement('h2'); heading.className='nx-mb-0';
      const link=document.createElement('a'); link.href=entry.href; link.textContent=entry.title; heading.append(link);
      const description=document.createElement('p'); description.className='nx-text-muted nx-mb-0'; description.textContent=entry.description;
      body.append(eyebrow,heading,description); article.append(body); return article;
    }));
    docsSearchStatus.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} found.`;
    if (syncUrl) { const params=new URLSearchParams(); if(docsSearch.value.trim())params.set('q',docsSearch.value.trim()); if(type)params.set('type',type); history.replaceState(null,'',`${location.pathname}${params.size?`?${params}`:''}`); }
  };
  docsSearch.addEventListener('input',()=>renderSearch());
  docsSearchType.addEventListener('change',()=>renderSearch());
  docsSearch.addEventListener('keydown',(event)=>{if(event.key==='ArrowDown'){const first=docsSearchResults.querySelector<HTMLAnchorElement>('a');if(first){event.preventDefault();first.focus()}}else if(event.key==='Escape'&&docsSearch.value){event.preventDefault();docsSearch.value='';renderSearch();}});
  docsSearchResults.addEventListener('keydown',(event)=>{if(event.key==='Escape'){event.preventDefault();docsSearch.focus()}});
  renderSearch(false);
}
document.addEventListener('keydown',(event)=>{
  if(event.key!=='/'||event.ctrlKey||event.metaKey||event.altKey||event.defaultPrevented)return;
  const target=event.target as HTMLElement;
  if(target.matches('input, textarea, select, [contenteditable="true"]'))return;
  event.preventDefault();
  if(docsSearch)docsSearch.focus();else location.href='./search.html';
});
const contractRoot = document.querySelector<HTMLElement>('#component-contracts');
if (contractRoot) renderComponentContracts(contractRoot);
const detailRoot = document.querySelector<HTMLElement>('#component-details');
const detailSearch = document.querySelector<HTMLInputElement>('#component-detail-search');
const detailGroup = document.querySelector<HTMLSelectElement>('#component-detail-group');
const detailStatus = document.querySelector<HTMLElement>('#component-detail-status');
if (detailRoot) {
  const initialParams = new URLSearchParams(location.search);
  if (detailSearch) detailSearch.value = initialParams.get('q') ?? '';
  if (detailGroup && [...detailGroup.options].some((option) => option.value === initialParams.get('group'))) detailGroup.value = initialParams.get('group') ?? '';
  const updateDetails = (syncUrl = true) => {
    const terms = (detailSearch?.value.trim().toLowerCase() ?? '').split(/\s+/).filter(Boolean);
    const group = detailGroup?.value ?? '';
    const matches = componentContracts.filter((item) => {
      const searchable = Object.values(item).join(' ').toLowerCase();
      return (!group || item.group === group) && terms.every((term) => searchable.includes(term));
    });
    renderComponentDetails(detailRoot, matches);
    if (detailStatus) detailStatus.textContent = `${matches.length} of ${componentContracts.length} components shown.`;
    if (syncUrl) {
      const params = new URLSearchParams();
      if (detailSearch?.value.trim()) params.set('q', detailSearch.value.trim());
      if (detailGroup?.value) params.set('group', detailGroup.value);
      const query = params.size ? `?${params}` : '';
      history.replaceState(null, '', `${location.pathname}${query}${location.hash}`);
    }
  };
  detailSearch?.addEventListener('input', () => updateDetails());
  detailGroup?.addEventListener('change', () => updateDetails());
  window.addEventListener('hashchange', () => {
    if (!location.hash) return;
    if (detailSearch) detailSearch.value = '';
    if (detailGroup) detailGroup.value = '';
    updateDetails();
    requestAnimationFrame(() => document.querySelector<HTMLElement>(location.hash)?.scrollIntoView());
  });
  updateDetails(false);
}
const componentPageRoot = document.querySelector<HTMLElement>('#component-page');
if (componentPageRoot) renderComponentPage(componentPageRoot, new URLSearchParams(location.search).get('component') ?? '');
document.querySelectorAll<HTMLElement>('.docs-code').forEach(block => block.setAttribute('tabindex','0'));
document.querySelectorAll<HTMLButtonElement>('[data-copy-target]').forEach(button=>button.addEventListener('click',async()=>{const target=document.querySelector<HTMLElement>(button.dataset.copyTarget??'');if(!target)return;try{await navigator.clipboard.writeText(target.textContent??'');button.textContent='Copied';window.setTimeout(()=>button.textContent='Copy',1600)}catch{button.textContent='Select and copy';target.focus()}}));
const themeToggles = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
themeToggles.forEach((button) => button.addEventListener('click', () => {
  const dark = document.documentElement.dataset.nxTheme !== 'dark'; ThemePreference.apply(dark ? 'dark' : 'light');
  themeToggles.forEach((toggle) => { toggle.textContent = dark ? 'Light theme' : 'Dark theme'; });
}));
document.querySelectorAll<HTMLButtonElement>('[data-dir-toggle]').forEach((button) => button.addEventListener('click', () => { document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'; }));
const eventPanel = document.querySelector<HTMLElement>('#event-panel');
const eventStatus = document.querySelector<HTMLElement>('[data-event-status]');
eventPanel?.addEventListener('nx:beforeopen', (event) => {
  if (document.querySelector<HTMLInputElement>('[data-cancel-open]')?.checked) {
    event.preventDefault();
    if (eventStatus) eventStatus.textContent = 'nx:beforeopen canceled. The panel stayed closed.';
  }
});
eventPanel?.addEventListener('nx:open', () => { if (eventStatus) eventStatus.textContent = 'nx:open fired. The panel is now open.'; });
eventPanel?.addEventListener('nx:close', () => { if (eventStatus) eventStatus.textContent = 'nx:close fired. The panel is now closed.'; });
document.querySelector<HTMLButtonElement>('button[data-brand-demo]')?.addEventListener('click',(event)=>{const root=document.documentElement;const active=root.dataset.brandDemo==='violet';if(active)delete root.dataset.brandDemo;else root.dataset.brandDemo='violet';(event.currentTarget as HTMLButtonElement).textContent=active?'Apply violet brand tokens':'Restore default brand';const status=document.querySelector<HTMLElement>('[data-brand-status]');if(status)status.textContent=active?'Default brand':'Violet brand active'});
document.querySelector<HTMLButtonElement>('[data-toast-demo]')?.addEventListener('click', () => Toast.show('Nexaline toast announced politely.', { duration: 2400 }));
const liveMessages={saved:{target:'#polite-live-demo',message:'Saved. Changes are complete.'},error:{target:'#assertive-live-demo',message:'Could not continue. Review the fields.'},loading:{target:'#polite-live-demo',message:'Loading data.'}} as const;
document.querySelectorAll<HTMLButtonElement>('[data-live-demo]').forEach((button)=>button.addEventListener('click',()=>{const key=button.dataset.liveDemo as keyof typeof liveMessages;const entry=liveMessages[key];const region=entry&&document.querySelector<HTMLElement>(entry.target);if(!region)return;region.textContent='';window.setTimeout(()=>{region.textContent=entry.message},50)}));
const search=document.querySelector<HTMLInputElement>('#customer-search');
const rows=[...document.querySelectorAll<HTMLElement>('[data-customer]')];
const empty=document.querySelector<HTMLElement>('#empty-state');
search?.addEventListener('input',()=>{const term=search.value.toLowerCase();let shown=0;rows.forEach(row=>{const match=(row.textContent??'').toLowerCase().includes(term);row.hidden=!match;if(match)shown++});if(empty)empty.hidden=shown!==0});
document.querySelector<HTMLFormElement>('#customer-form')?.addEventListener('submit',(event)=>{event.preventDefault();const email=document.querySelector<HTMLInputElement>('#customer-email')!;const error=document.querySelector<HTMLElement>('#email-error')!;if(!email.validity.valid){email.setAttribute('aria-invalid','true');error.hidden=false;email.focus();return}email.removeAttribute('aria-invalid');error.hidden=true;document.querySelector<HTMLDialogElement>('#add-customer')?.close();document.querySelector<HTMLElement>('#demo-status')!.textContent='Simulated: customer validated locally. No record was saved.'});
const guideForm = document.querySelector<HTMLFormElement>('#guide-form');
if (guideForm) {
  const summary = guideForm.querySelector<HTMLElement>('#guide-form-summary')!;
  const summaryList = summary.querySelector<HTMLUListElement>('[data-form-errors]')!;
  const success = guideForm.querySelector<HTMLElement>('[data-form-success]')!;
  const fields = [
    {control: guideForm.querySelector<HTMLInputElement>('#guide-name')!, error: guideForm.querySelector<HTMLElement>('#guide-name-error')!, message:'Enter your full name.'},
    {control: guideForm.querySelector<HTMLInputElement>('#guide-email')!, error: guideForm.querySelector<HTMLElement>('#guide-email-error')!, message:'Enter a valid email address.'},
    {control: guideForm.querySelector<HTMLInputElement>('input[name="guide-plan"]')!, error: guideForm.querySelector<HTMLElement>('#guide-plan-error')!, message:'Choose a plan.'},
    {control: guideForm.querySelector<HTMLInputElement>('#guide-terms')!, error: guideForm.querySelector<HTMLElement>('#guide-terms-error')!, message:'Accept the terms to continue.'}
  ];
  const validate = () => fields.filter(({control,error}) => { const invalid=!control.validity.valid; control.setAttribute('aria-invalid',String(invalid)); error.hidden=!invalid; return invalid; });
  guideForm.addEventListener('submit', (event) => { event.preventDefault(); success.textContent=''; const invalid=validate(); summaryList.replaceChildren(...invalid.map(({control,message})=>{const item=document.createElement('li');const link=document.createElement('a');link.href=`#${control.id}`;link.textContent=message;item.append(link);return item})); summary.hidden=invalid.length===0; if(invalid.length){summary.focus();return} success.textContent='Account details are valid. This documentation example did not send data.'; });
  guideForm.addEventListener('input', () => { if (!summary.hidden) validate(); });
}
