export const breakpoints = Object.freeze({md:'48rem',lg:'64rem'});

export const utilities = Object.freeze([
  ['hidden','display:none'],['block','display:block'],['flex','display:flex'],['grid','display:grid'],
  ['flex-col','flex-direction:column'],['flex-row','flex-direction:row'],['flex-wrap','flex-wrap:wrap'],
  ['items-center','align-items:center'],['items-start','align-items:flex-start'],['justify-between','justify-content:space-between'],['justify-center','justify-content:center'],
  ['grid-cols-1','grid-template-columns:minmax(0,1fr)'],['grid-cols-2','grid-template-columns:repeat(2,minmax(0,1fr))'],
  ['gap-2','gap:var(--nx-space-2)'],['gap-3','gap:var(--nx-space-3)'],['gap-4','gap:var(--nx-space-4)'],['gap-6','gap:var(--nx-space-6)'],
  ['p-4','padding:var(--nx-space-4)'],['p-6','padding:var(--nx-space-6)'],['px-4','padding-inline:var(--nx-space-4)'],['py-4','padding-block:var(--nx-space-4)'],
  ['m-0','margin:0'],['mt-2','margin-block-start:var(--nx-space-2)'],['mt-4','margin-block-start:var(--nx-space-4)'],['mb-0','margin-block-end:0'],
  ['w-full','inline-size:100%'],['max-w-md','max-inline-size:32rem'],['text-sm','font-size:var(--nx-text-sm)'],['text-lg','font-size:var(--nx-text-lg)'],['font-semibold','font-weight:600'],
  ['text-muted','color:var(--nx-color-text-muted)'],['text-danger','color:var(--nx-color-danger)'],['bg-surface','background:var(--nx-color-surface)'],['bg-muted','background:var(--nx-color-surface-muted)'],
  ['border','border:1px solid var(--nx-color-border)'],['rounded-md','border-radius:var(--nx-radius-md)'],['rounded-lg','border-radius:var(--nx-radius-lg)'],['shadow-md','box-shadow:var(--nx-shadow-md)'],['overflow-auto','overflow:auto'],
  ['sr-only','position:absolute!important;inline-size:1px!important;block-size:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important'],
]);

export const responsiveUtilities = Object.freeze({
  md:['grid','grid-cols-2','flex-row','block','hidden'],
  lg:['grid-cols-2','flex-row','block','hidden'],
});
