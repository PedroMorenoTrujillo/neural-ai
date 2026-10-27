# @neural-ui/native/checkbox

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuCheckboxComponent

Selector: `neu-checkbox`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| labelPosition | no | `import("@angular/core").InputSignal<"left" \| "right">` |
| checked | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| checkedChange | `import("@angular/core").ModelSignal<boolean>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
