export const browserSupport = Object.freeze({
  chrome: 111,
  edge: 111,
  firefox: 114,
  safari: 16.4,
  ios: 16.4,
});

export const browserBuildTargets = Object.freeze([
  `chrome${browserSupport.chrome}`,
  `edge${browserSupport.edge}`,
  `firefox${browserSupport.firefox}`,
  `safari${browserSupport.safari}`,
]);

export const browserSupportLabel = `Chrome ${browserSupport.chrome}+, Edge ${browserSupport.edge}+, Firefox ${browserSupport.firefox}+, Safari and iOS ${browserSupport.safari}+`;
