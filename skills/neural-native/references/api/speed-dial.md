# @neural-ui/native/speed-dial

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuSpeedDialAction

```typescript
export interface NeuSpeedDialAction extends NeuOption {
    readonly svg?: string;
}
```

## NeuSpeedDialComponent

Selector: `neu-speed-dial`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| actions | no | `import("@angular/core").InputSignal<readonly NeuSpeedDialAction[]>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
