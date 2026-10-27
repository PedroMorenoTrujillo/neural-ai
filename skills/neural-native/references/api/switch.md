# @neural-ui/native/switch

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuSwitchComponent

Selector: `neu-switch`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| labelPosition | no | `import("@angular/core").InputSignal<"left" \| "right">` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| checked | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| checkedChange | `import("@angular/core").ModelSignal<boolean>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
