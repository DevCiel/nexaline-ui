export type ReleaseArtifact = { package: string; version: string; filename: string; bytes: number; sha256: string };
export type ReleaseManifest = { schemaVersion: 1; algorithm: 'sha256'; version: string; artifacts: ReleaseArtifact[] };
export function createReleaseManifest(): Promise<string>;
export function writeReleaseManifest(): Promise<string>;
export function verifyReleaseManifest(): Promise<ReleaseManifest>;
