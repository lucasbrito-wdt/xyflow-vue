import {
  defineNuxtModule,
  addComponent,
  addImports,
  addPlugin,
  createResolver,
} from '@nuxt/kit';

export interface ModuleOptions {
  /**
   * Auto-import `xyflow-vue` components (VueFlow, Background, Controls, MiniMap, …).
   * @default true
   */
  components?: boolean;

  /**
   * Auto-import composables (useVueFlow, useNodes, useEdges, useUndoRedo, …).
   * @default true
   */
  composables?: boolean;

  /**
   * Inject `xyflow-vue/dist/style.css` globally.
   * Set `false` if you want to import it yourself (or use the base-only `base.css`).
   * @default true
   */
  css?: boolean | 'base';

  /**
   * Prefix for auto-imported components (e.g. `Xyf` → `<XyfVueFlow>`).
   * Leave empty for original names.
   * @default ''
   */
  prefix?: string;
}

const COMPONENTS = [
  'VueFlow',
  'VueFlowProvider',
  'Handle',
  'Background',
  'Controls',
  'ControlButton',
  'MiniMap',
  'MinimapNode',
  'NodeToolbar',
  'EdgeToolbar',
  'NodeResizer',
  'ResizeControl',
  'Panel',
  'ViewportPortal',
  'EdgeLabel',
  'EdgeReconnectAnchor',
  'Attribution',
  'BaseEdge',
  'BezierEdge',
  'StraightEdge',
  'StepEdge',
  'SmoothStepEdge',
  'DefaultNode',
  'InputNode',
  'OutputNode',
  'GroupNode',
];

const COMPOSABLES = [
  'useVueFlow',
  'useStore',
  'useNodes',
  'useEdges',
  'useViewport',
  'useInternalNode',
  'useUpdateNodeInternals',
  'useConnection',
  'useInitialized',
  'useNodesData',
  'useNodeConnections',
  'useColorMode',
  'useOnSelectionChange',
  'useKeyboardShortcuts',
  'useSelectionBox',
  'useDrag',
  'useUndoRedo',
];

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'xyflow-vue-nuxt',
    configKey: 'xyflowVue',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    components: true,
    composables: true,
    css: true,
    prefix: '',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Global CSS injection
    if (options.css) {
      const sheet = options.css === 'base' ? 'xyflow-vue/dist/base.css' : 'xyflow-vue/dist/style.css';
      nuxt.options.css = nuxt.options.css || [];
      if (!nuxt.options.css.includes(sheet)) {
        nuxt.options.css.push(sheet);
      }
    }

    // Transpile so Nuxt's build handles the package correctly (ESM + .vue)
    nuxt.options.build = nuxt.options.build || {};
    nuxt.options.build.transpile = nuxt.options.build.transpile || [];
    if (!nuxt.options.build.transpile.includes('xyflow-vue')) {
      nuxt.options.build.transpile.push('xyflow-vue');
    }
    if (!nuxt.options.build.transpile.includes('@xyflow/system')) {
      nuxt.options.build.transpile.push('@xyflow/system');
    }

    // Auto-import components
    if (options.components) {
      for (const name of COMPONENTS) {
        addComponent({
          name: `${options.prefix}${name}`,
          export: name,
          filePath: 'xyflow-vue',
        });
      }
    }

    // Auto-import composables
    if (options.composables) {
      addImports(
        COMPOSABLES.map((name) => ({
          name,
          from: 'xyflow-vue',
        }))
      );
    }

    // SSR guard: inject plugin that no-ops on server. VueFlow is already
    // SSR-safe internally (ResizeObserver/window behind onMounted), but a
    // plugin hook is a convenient place to set sensible defaults later.
    addPlugin(resolver.resolve('./runtime/plugin'));
  },
});
