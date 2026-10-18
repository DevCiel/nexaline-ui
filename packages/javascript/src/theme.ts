export type Theme = 'light'|'dark'|'system';
export class ThemePreference {
  static readonly key='nx:v1:theme';
  static apply(theme:Theme, persist=false){document.documentElement.dataset.nxTheme=theme;if(persist)try{localStorage.setItem(this.key,theme)}catch{} }
  static restore(){let value:string|null=null;try{value=localStorage.getItem(this.key)}catch{}if(value==='light'||value==='dark'||value==='system'){this.apply(value);return value}return null}
}
