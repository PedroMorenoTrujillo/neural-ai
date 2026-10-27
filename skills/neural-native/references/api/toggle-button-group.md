# @neural-ui/native/toggle-button-group

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuToggleButtonGroupComponent

Selector: `neu-toggle-button-group`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
