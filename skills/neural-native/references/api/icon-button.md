# @neural-ui/native/icon-button

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuIconButtonComponent

Selector: `neu-icon-button`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| svg | yes | `import("@angular/core").InputSignal<string>` |
| variant | no | `import("@angular/core").InputSignal<NeuVariant>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| pressed | `import("@angular/core").OutputEmitterRef<import("@ng-native/components").TouchEvent>` |
