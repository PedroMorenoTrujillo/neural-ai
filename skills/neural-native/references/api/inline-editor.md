# @neural-ui/native/inline-editor

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuInlineEditorComponent

Selector: `neu-inline-editor`

| Input | Required | Type |
| --- | --- | --- |
| editing | no | `import("@angular/core").ModelSignal<boolean>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| saveLabel | no | `import("@angular/core").InputSignal<string>` |
| cancelLabel | no | `import("@angular/core").InputSignal<string>` |
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
| editingChange | `import("@angular/core").ModelSignal<boolean>` |
| saved | `import("@angular/core").OutputEmitterRef<string>` |
| cancelled | `import("@angular/core").OutputEmitterRef<void>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
