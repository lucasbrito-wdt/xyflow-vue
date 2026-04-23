# Contributing

Thanks for considering a contribution.

## Dev setup

```bash
git clone https://github.com/lucasbrito-wdt/xyflow-vue
cd xyflow-vue
pnpm install
pnpm build     # build xyflow-vue once so the example app can resolve it
pnpm dev       # http://localhost:5173 — 20 interactive demos
pnpm docs:dev  # http://localhost:5174 — VitePress docs
```

## Workflow

1. **Open an issue first** for anything non-trivial. Breaking API changes, new dependencies, or new plugins should be discussed before code.
2. Branch from `main`. Small commits.
3. `pnpm typecheck` + `pnpm lint` must pass.
4. If you change component props/events, update:
   - `apps/docs/api/components.md` (or `events.md`)
   - The relevant example in `examples/vue/src/examples/`
5. Add a `changeset` for any public API change:
   ```bash
   pnpm changeset
   ```

## Code style

- TypeScript strict. No `any` without a comment explaining why.
- Single-quoted strings in `.ts`. Double-quoted in `.vue` template attrs.
- 2-space indent.
- `shallowRef` for any ref holding `Node[]` / `Edge[]` / large arrays.
- `markRaw()` components before stuffing them into reactive objects (`nodeTypes`, `edgeTypes`).
- Custom-node props: declare inline, avoid `defineProps<NodeProps>()` (SFC compiler call-stack).
- Keep per-file size reasonable. Split rather than balloon.

## Testing

End-to-end tests are planned — we'll port the svelte-flow Playwright fixtures. PRs adding test coverage welcome.

## Adding a new example

1. `examples/vue/src/examples/MyExample.vue`
2. Register it in `examples/vue/src/App.vue` under the appropriate group
3. Create `apps/docs/examples/my-slug.md` with `<ExampleFrame slug="myKey" />` + code
4. Add the sidebar entry in `apps/docs/.vitepress/config.ts`
5. Update [`EXAMPLES_BACKLOG.md`](./packages/vue/EXAMPLES_BACKLOG.md) to mark it ✅

## Reporting bugs

Include:
- Vue version
- `xyflow-vue` version
- Minimal reproduction (CodeSandbox / StackBlitz / small gist)
- Expected vs actual behavior
- Browser + OS (if UI-related)

Screenshots welcome for visual bugs. Stack traces required for crashes.
