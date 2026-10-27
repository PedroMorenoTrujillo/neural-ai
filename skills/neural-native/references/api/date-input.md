# @neural-ui/native/date-input

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuDateInputComponent

Selector: `neu-date-input`

| Input | Required | Type |
| --- | --- | --- |
| min | no | `import("@angular/core").InputSignal<string>` |
| max | no | `import("@angular/core").InputSignal<string>` |
| locale | no | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearsLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearsLabel | no | `import("@angular/core").InputSignal<string>` |
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
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
