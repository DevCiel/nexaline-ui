export type BrowserSupport = Readonly<{
  chrome: number;
  edge: number;
  firefox: number;
  safari: number;
  ios: number;
}>;

export const browserSupport: BrowserSupport;
export const browserBuildTargets: string[];
export const browserSupportLabel: string;
