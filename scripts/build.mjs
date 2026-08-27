import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'

mkdirSync('lib', { recursive: true })

// 1. Host bundle
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  external: ['@deepseek-ai/*'],
  sourcemap: true,
})

// 2. Client bundle (CJS factory wrapped for __ModuleLoader__)
const clientBanner = `window.__ModuleLoader__ && window.__ModuleLoader__.load({
  id: "dsh-snippet-vault",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
`
const clientFooter = `    return module.exports;
  }
});`

await build({
  entryPoints: ['src/client/index.ts'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  banner: {
    js: clientBanner,
  },
  footer: {
    js: clientFooter,
  },
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/*'],
  sourcemap: true,
})

console.log('✅ build done: lib/index.js + lib/client.js')
