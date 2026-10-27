# @neural-ui/native/password

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuPasswordComponent

Selector: `neu-password`

| Input | Required | Type |
| --- | --- | --- |
| revealed | no | `import("@angular/core").ModelSignal<boolean>` |
| showLabel | no | `import("@angular/core").InputSignal<string>` |
| hideLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| revealedChange | `import("@angular/core").ModelSignal<boolean>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
