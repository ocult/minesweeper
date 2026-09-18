import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [
    angular({
      tsconfig: resolve(__dirname, './src/tsconfig.spec.json'),
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['src/**/*.{spec,test}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
    },
  },
}));
