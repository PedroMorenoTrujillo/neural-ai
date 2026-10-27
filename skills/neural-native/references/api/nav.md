# @neural-ui/native/nav

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuNavComponent

Selector: `neu-nav`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuNavItem[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| navigate | `import("@angular/core").OutputEmitterRef<string>` |

## NeuNavItem

```typescript
export interface NeuNavItem extends NeuOption {
    readonly svg?: string;
}
```
