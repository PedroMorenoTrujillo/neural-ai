# @neural-ui/native/chip

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuChipComponent

Selector: `neu-chip`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| selected | no | `import("@angular/core").ModelSignal<boolean>` |
| selectable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| removable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| selectedChange | `import("@angular/core").ModelSignal<boolean>` |
| removed | `import("@angular/core").OutputEmitterRef<void>` |
