import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/index.ts',
        '**/*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],
      thresholds: {
        'src/logic/**': {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
        'src/components/**': {
          statements: 40,
          branches: 40,
          functions: 40,
          lines: 40,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
