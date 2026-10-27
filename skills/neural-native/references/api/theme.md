# @neural-ui/native/theme

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuThemeComponent

Selector: `neu-theme`

| Input | Required | Type |
| --- | --- | --- |
| scheme | no | `import("@angular/core").InputSignal<NeuColorScheme>` |
| tokens | no | `import("@angular/core").InputSignal<Partial<NeuTokens>>` |

| Output | Type |
| --- | --- |

Supported imperative members:

```typescript
readonly resolvedTokens: import("@angular/core").Signal<Readonly<NeuTokens>>;
```
