# Native themes and tokens

Wrap a screen or app in `NeuThemeComponent` from `@neural-ui/native/theme`. `scheme` is `system`, `light` or `dark`. `tokens` is `Partial<NeuTokens>` from `@neural-ui/native/foundation`; `resolvedTokens` exposes the resolved read-only theme.

The generated [token contract](api/tokens.md) lists all 28 public `NeuTokens` properties. Numeric radius, spacing, fontSize and duration are native values, not CSS strings. Optional semantic text inks resolve from theme surfaces when omitted. Light and dark defaults are recorded in the generated API snapshot.

```ts
import type { NeuTokens } from '@neural-ui/native/foundation';
const brand = { accent: '#3b5bdb', onAccent: '#ffffff', radius: 16 } satisfies Partial<NeuTokens>;
```

Bind `[tokens]="brand"` to `neu-theme`. Fixed overrides apply in both modes, so use mode-specific values where a brand color needs different readable ink in dark mode. The [theme example](../examples/theme.ts) demonstrates a mode switch with a readable palette in each mode.

Use supported native styles and resolved `--neu-*` theme variables, such as `color: var(--neu-text)` or `background-color: var(--neu-surface)`. Do not copy the Web v2 catalogue's hundreds of CSS tokens or assume each is a Native override. Component-specific styles still belong to the actual renderer; browser DOM CSS and arbitrary layout features may not map to iOS/Android.

Preserve safe-area and text-scaling behavior when changing density. Customizing a theme does not justify changing a control's data or action contract.
