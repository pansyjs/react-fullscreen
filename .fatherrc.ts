import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'lib',
    transformer: 'esbuild',
  },
  esm: {
    output: 'es',
    transformer: 'esbuild',
  },
})
