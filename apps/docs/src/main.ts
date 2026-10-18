import '../../../packages/core/src/index.css';
import '../../../packages/core/src/utilities/utilities.css';
import '../../../packages/components/src/components.css';
import { init, ThemePreference } from '../../../packages/javascript/src/index';
import { Toast } from '../../../packages/javascript/src/toast';
import './site.css';
import { renderComponentContracts } from './contracts';

init(document);
const contractRoot = document.querySelector<HTMLElement>('#component-contracts');
if (contractRoot) renderComponentContracts(contractRoot);
document.querySelectorAll<HTMLElement>('.docs-code').forEach(block => block.setAttribute('tabindex','0'));
document.querySelectorAll<HTMLButtonElement>('[data-copy-target]').forEach(button=>button.addEventListener('click',async()=>{const target=document.querySelector<HTMLElement>(button.dataset.copyTarget??'');if(!target)return;try{await navigator.clipboard.writeText(target.textContent??'');button.textContent='Copied';window.setTimeout(()=>button.textContent='Copy',1600)}catch{button.textContent='Select and copy';target.focus()}}));
document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.addEventListener('click', (event) => {
  const dark = document.documentElement.dataset.nxTheme !== 'dark'; ThemePreference.apply(dark ? 'dark' : 'light');
  (event.currentTarget as HTMLButtonElement).textContent = dark ? 'Light theme' : 'Dark theme';
});
document.querySelector<HTMLButtonElement>('[data-dir-toggle]')?.addEventListener('click', () => { document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'; });
document.querySelector<HTMLButtonElement>('button[data-brand-demo]')?.addEventListener('click',(event)=>{const root=document.documentElement;const active=root.dataset.brandDemo==='violet';if(active)delete root.dataset.brandDemo;else root.dataset.brandDemo='violet';(event.currentTarget as HTMLButtonElement).textContent=active?'Apply violet brand tokens':'Restore default brand';const status=document.querySelector<HTMLElement>('[data-brand-status]');if(status)status.textContent=active?'Default brand':'Violet brand active'});
document.querySelector<HTMLButtonElement>('[data-toast-demo]')?.addEventListener('click', () => Toast.show('Nexaline toast announced politely.', { duration: 2400 }));
const liveMessages={saved:{target:'#polite-live-demo',message:'Saved. Changes are complete.'},error:{target:'#assertive-live-demo',message:'Could not continue. Review the fields.'},loading:{target:'#polite-live-demo',message:'Loading data.'}} as const;
document.querySelectorAll<HTMLButtonElement>('[data-live-demo]').forEach((button)=>button.addEventListener('click',()=>{const key=button.dataset.liveDemo as keyof typeof liveMessages;const entry=liveMessages[key];const region=entry&&document.querySelector<HTMLElement>(entry.target);if(!region)return;region.textContent='';window.setTimeout(()=>{region.textContent=entry.message},50)}));
const search=document.querySelector<HTMLInputElement>('#customer-search');
const rows=[...document.querySelectorAll<HTMLElement>('[data-customer]')];
const empty=document.querySelector<HTMLElement>('#empty-state');
search?.addEventListener('input',()=>{const term=search.value.toLowerCase();let shown=0;rows.forEach(row=>{const match=(row.textContent??'').toLowerCase().includes(term);row.hidden=!match;if(match)shown++});if(empty)empty.hidden=shown!==0});
document.querySelector<HTMLFormElement>('#customer-form')?.addEventListener('submit',(event)=>{event.preventDefault();const email=document.querySelector<HTMLInputElement>('#customer-email')!;const error=document.querySelector<HTMLElement>('#email-error')!;if(!email.validity.valid){email.setAttribute('aria-invalid','true');error.hidden=false;email.focus();return}email.removeAttribute('aria-invalid');error.hidden=true;document.querySelector<HTMLDialogElement>('#add-customer')?.close();document.querySelector<HTMLElement>('#demo-status')!.textContent='Simulated: customer validated locally. No record was saved.'});
