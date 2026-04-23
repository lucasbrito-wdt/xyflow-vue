#!/usr/bin/env node
/**
 * Tree-shake audit for xyflow-vue.
 *
 * Builds several tiny Vite apps that each import a different subset of
 * xyflow-vue, then reports the minified+gzipped bundle size so you can see:
 *   1. Baseline (VueFlow + Background only) — the cost of the core renderer.
 *   2. Full surface — everything imported.
 *   3. Per-plugin delta — MiniMap, NodeResizer, etc added on top of baseline.
 *
 * Run: `node scripts/bundle-audit.mjs`
 */

import { mkdtempSync, writeFileSync, mkdirSync, rmSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';

const scenarios = {
  'baseline (VueFlow + Background)': `
    import { createApp, h, ref } from 'vue';
    import { VueFlow, Background } from 'xyflow-vue';
    createApp({ setup: () => () => h(VueFlow, { nodes: ref([]), edges: ref([]) }, () => h(Background)) }).mount('#app');
  `,
  '+ Controls + MiniMap': `
    import { createApp, h, ref } from 'vue';
    import { VueFlow, Background, Controls, MiniMap } from 'xyflow-vue';
    createApp({ setup: () => () => h(VueFlow, { nodes: ref([]), edges: ref([]) }, () => [h(Background), h(Controls), h(MiniMap)]) }).mount('#app');
  `,
  '+ NodeResizer + NodeToolbar + EdgeToolbar': `
    import { createApp, h, ref } from 'vue';
    import { VueFlow, Background, NodeResizer, NodeToolbar, EdgeToolbar } from 'xyflow-vue';
    createApp({ setup: () => () => h(VueFlow, { nodes: ref([]), edges: ref([]) }, () => [h(Background), h(NodeResizer), h(NodeToolbar), h(EdgeToolbar)]) }).mount('#app');
  `,
  '+ useUndoRedo': `
    import { createApp, h, ref } from 'vue';
    import { VueFlow, Background, useUndoRedo } from 'xyflow-vue';
    const Inner = { setup() { useUndoRedo(); return () => h('div'); } };
    createApp({ setup: () => () => h(VueFlow, { nodes: ref([]), edges: ref([]) }, () => [h(Background), h(Inner)]) }).mount('#app');
  `,
  'full surface (everything)': `
    import { createApp, h, ref } from 'vue';
    import * as xy from 'xyflow-vue';
    // force-reference every export so rollup can't drop any
    const used = Object.keys(xy).length;
    createApp({ setup: () => () => h(xy.VueFlow, { nodes: ref([]), edges: ref([]), 'data-used': used }, () => h(xy.Background)) }).mount('#app');
  `,
};

const root = process.cwd();
const tmp = mkdtempSync(join(tmpdir(), 'xyflow-vue-audit-'));

// Reusable vite config for all scenarios
const viteConfigSource = `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'esbuild',
    rollupOptions: { output: { manualChunks: undefined } },
  },
});
`;

function dirSize(dir) {
  let total = 0;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) total += dirSize(p);
    else total += s.size;
  }
  return total;
}

function jsFiles(dir) {
  return readdirSync(dir).filter((f) => f.endsWith('.js') || f.endsWith('.mjs'));
}

const results = [];

for (const [name, source] of Object.entries(scenarios)) {
  const proj = join(tmp, name.replace(/[^a-z0-9]+/gi, '-'));
  mkdirSync(proj, { recursive: true });
  mkdirSync(join(proj, 'src'), { recursive: true });

  writeFileSync(
    join(proj, 'package.json'),
    JSON.stringify({
      name: 'audit',
      version: '0.0.0',
      private: true,
      type: 'module',
      dependencies: { 'xyflow-vue': 'file:' + join(root, 'packages', 'vue'), vue: '^3.5.0' },
      devDependencies: { '@vitejs/plugin-vue': '^5.1.4', vite: '^5.4.10' },
    })
  );
  writeFileSync(join(proj, 'vite.config.mjs'), viteConfigSource);
  writeFileSync(join(proj, 'index.html'), '<html><body><div id="app"></div><script type="module" src="./src/main.js"></script></body></html>');
  writeFileSync(join(proj, 'src/main.js'), source);

  try {
    execSync('pnpm install --ignore-workspace --no-frozen-lockfile --silent', { cwd: proj, stdio: 'inherit' });
    execSync('npx vite build --logLevel warn', { cwd: proj, stdio: 'inherit' });
  } catch (err) {
    console.error(`✖ ${name} failed:`, err.message);
    continue;
  }

  const distAssets = join(proj, 'dist', 'assets');
  if (!existsSync(distAssets)) {
    console.warn(`✖ no dist/assets for ${name}`);
    continue;
  }

  let rawJs = 0;
  let gzJs = 0;
  for (const f of jsFiles(distAssets)) {
    const buf = readFileSync(join(distAssets, f));
    rawJs += buf.byteLength;
    gzJs += gzipSync(buf).byteLength;
  }

  results.push({ name, raw: rawJs, gz: gzJs });
}

rmSync(tmp, { recursive: true, force: true });

const fmt = (n) => (n / 1024).toFixed(2) + ' kB';
const table = results.map((r, i) => {
  const delta = i > 0 ? ` (+${fmt(r.gz - results[0].gz)} gz)` : '';
  return `  ${r.name.padEnd(48)}  ${fmt(r.raw).padStart(10)}  ${fmt(r.gz).padStart(10)}${delta}`;
});

console.log('\nxyflow-vue tree-shake audit\n');
console.log('  scenario'.padEnd(50) + '       raw        gz');
console.log('  ' + '-'.repeat(72));
console.log(table.join('\n'));
console.log('');
