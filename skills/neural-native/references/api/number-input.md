# @neural-ui/native/number-input

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuNumberInputComponent

Selector: `neu-number-input`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<number>` |
| min | no | `import("@angular/core").InputSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| step | no | `import("@angular/core").InputSignal<number>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| decreaseLabel | no | `import("@angular/core").InputSignal<string>` |
| increaseLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<number>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
