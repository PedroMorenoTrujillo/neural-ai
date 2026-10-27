# @neural-ui/native/rating

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuRatingComponent

Selector: `neu-rating`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| clearable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| clearLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<number>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
