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

// 2. Client bundle (IIFE with __ModuleLoader__)
await build({
  entryPoints: ['src/client/index.ts'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'iife',
  globalName: '__dsh_client_snippet_vault__',
  banner: {
    js: `window.__ModuleLoader__ && window.__ModuleLoader__.load({ id: "dsh-snippet-vault", factory: function(require, exports, module) {`,
  },
  footer: {
    js: `}});`,
  },
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/*'],
  sourcemap: true,
})

console.log('✅ build done: lib/index.js + lib/client.js')
