export const rootTokens = Object.freeze({
  'blue-50':'#eef6ff','blue-500':'#3478f6','blue-600':'#2364d8','blue-700':'#194daf',
  'slate-50':'#f7f9fc','slate-100':'#eef1f6','slate-300':'#cbd3df','slate-500':'#667085','slate-700':'#344054','slate-900':'#101828',
  'red-50':'#fff1f1','red-600':'#d92d20','green-50':'#ecfdf3','green-600':'#039855','amber-50':'#fffaeb','amber-700':'#b54708',
  'color-primary':'var(--nx-blue-600)','color-primary-hover':'var(--nx-blue-700)','color-on-primary':'#fff','color-surface':'#fff','color-surface-muted':'var(--nx-slate-50)','color-surface-raised':'#fff','color-text':'var(--nx-slate-900)','color-text-muted':'var(--nx-slate-500)','color-border':'var(--nx-slate-300)','color-focus':'#84adff','color-success':'var(--nx-green-600)','color-warning':'var(--nx-amber-700)','color-danger':'var(--nx-red-600)',
  'font-sans':'Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif','font-mono':'ui-monospace,SFMono-Regular,Consolas,monospace',
  'text-xs':'.75rem','text-sm':'.875rem','text-md':'1rem','text-lg':'1.125rem','text-xl':'1.5rem','text-2xl':'2rem','leading-tight':'1.25','leading-normal':'1.55',
  'space-0':'0','space-1':'.25rem','space-2':'.5rem','space-3':'.75rem','space-4':'1rem','space-5':'1.25rem','space-6':'1.5rem','space-8':'2rem','space-10':'2.5rem','space-12':'3rem',
  'radius-sm':'.375rem','radius-md':'.625rem','radius-lg':'1rem','radius-full':'9999px',
  'shadow-sm':'0 1px 2px rgb(16 24 40/.06)','shadow-md':'0 10px 30px rgb(16 24 40/.12)','shadow-lg':'0 24px 64px rgb(16 24 40/.2)',
  'duration-fast':'140ms','duration-normal':'220ms','ease':'cubic-bezier(.2,.8,.2,1)',
  'z-dropdown':'30','z-drawer':'50','z-dialog':'60','control-height':'2.75rem','control-pad':'.75rem','container':'75rem','gutter':'clamp(1rem,3vw,2rem)',
});

export const darkTokens = Object.freeze({
  'color-primary':'#77a7ff','color-primary-hover':'#a6c4ff','color-on-primary':'#07152f','color-surface':'#101828','color-surface-muted':'#182230','color-surface-raised':'#1d2939','color-text':'#f2f4f7','color-text-muted':'#98a2b3','color-border':'#344054','color-focus':'#84adff',
});

export const compactTokens = Object.freeze({'control-height':'2.25rem','control-pad':'.5rem'});
