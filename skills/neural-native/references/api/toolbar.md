# @neural-ui/native/toolbar

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuToolbarAction

```typescript
export interface NeuToolbarAction extends NeuOption {
    readonly svg?: string;
}
```

## NeuToolbarComponent

Selector: `neu-toolbar`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| actions | no | `import("@angular/core").InputSignal<readonly NeuToolbarAction[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
