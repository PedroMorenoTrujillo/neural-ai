# @neural-ui/native/input

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuInputComponent

Selector: `neu-input`

| Input | Required | Type |
| --- | --- | --- |
| keyboardType | no | `import("@angular/core").InputSignal<"default" \| "email-address" \| "numeric" \| "phone-pad">` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| maxLength | no | `import("@angular/core").InputSignalWithTransform<number \| undefined, number \| undefined>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
