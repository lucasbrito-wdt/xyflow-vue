import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@xyflow/vue',
  description: 'Vue 3 port of xyflow — node-based editors, flow charts, diagrams',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/components' },
      { text: 'Examples', link: '/examples/' },
      { text: 'GitHub', link: 'https://github.com/xyflow/xyflow' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/getting-started' },
            { text: 'Your first flow', link: '/guide/first-flow' },
            { text: 'Custom nodes', link: '/guide/custom-nodes' },
            { text: 'Custom edges', link: '/guide/custom-edges' },
            { text: 'State management', link: '/guide/state' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Nuxt / SSR', link: '/guide/ssr' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components', link: '/api/components' },
            { text: 'Composables', link: '/api/composables' },
            { text: 'Events', link: '/api/events' },
            { text: 'Types', link: '/api/types' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [{ text: 'Overview', link: '/examples/' }],
        },
        {
          text: 'Basics',
          items: [
            { text: 'Feature Overview', link: '/examples/overview' },
            { text: 'Custom Node', link: '/examples/custom' },
            { text: 'Drag & Drop', link: '/examples/dnd' },
            { text: 'Events Log', link: '/examples/events' },
            { text: 'Updating Nodes', link: '/examples/updating' },
            { text: 'Save & Restore', link: '/examples/save-restore' },
          ],
        },
        {
          text: 'Nodes',
          items: [
            { text: 'Node Toolbar', link: '/examples/node-toolbar' },
            { text: 'Node Resizer', link: '/examples/node-resizer' },
            { text: 'Delete Middle Node', link: '/examples/delete-middle' },
            { text: 'Subflow', link: '/examples/subflow' },
            { text: 'Stress Test', link: '/examples/stress' },
          ],
        },
        {
          text: 'Edges',
          items: [
            { text: 'Edge Types', link: '/examples/edge-types' },
            { text: 'Edge Markers', link: '/examples/edge-markers' },
          ],
        },
        {
          text: 'Interaction',
          items: [
            { text: 'Validation', link: '/examples/validation' },
            { text: 'Add Node On Edge Drop', link: '/examples/add-on-drop' },
            { text: 'Context Menu', link: '/examples/context-menu' },
            { text: 'Connection Limit', link: '/examples/connection-limit' },
            { text: 'Preventing Cycles', link: '/examples/cycles' },
          ],
        },
        {
          text: 'Layout',
          items: [{ text: 'Horizontal Flow', link: '/examples/horizontal' }],
        },
        {
          text: 'Styling',
          items: [{ text: 'Dark Mode', link: '/examples/dark' }],
        },
      ],
    },
    footer: {
      message: 'MIT licensed',
      copyright: 'xyflow',
    },
  },
  vite: {
    server: {
      fs: {
        allow: ['../../../..'],
      },
    },
  },
});
