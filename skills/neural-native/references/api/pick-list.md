# @neural-ui/native/pick-list

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuPickListComponent

Selector: `neu-pick-list`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| selectedLabel | no | `import("@angular/core").InputSignal<string>` |
| availableLabel | no | `import("@angular/core").InputSignal<string>` |
| upLabel | no | `import("@angular/core").InputSignal<string>` |
| downLabel | no | `import("@angular/core").InputSignal<string>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |
| addLabel | no | `import("@angular/core").InputSignal<string>` |
| emptySelectedLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyAvailableLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
