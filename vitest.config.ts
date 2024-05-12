import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './setup-test.js',
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
});
