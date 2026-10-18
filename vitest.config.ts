import { defineConfig } from 'vitest/config';
export default defineConfig({test:{environment:'jsdom',include:['tests/unit/**/*.test.ts'],coverage:{include:['packages/javascript/src/**/*.ts']}}});
