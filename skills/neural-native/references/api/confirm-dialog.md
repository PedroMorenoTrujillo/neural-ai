# @neural-ui/native/confirm-dialog

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuConfirmDialogComponent

Selector: `neu-confirm-dialog`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| title | yes | `import("@angular/core").InputSignal<string>` |
| message | yes | `import("@angular/core").InputSignal<string>` |
| confirmLabel | no | `import("@angular/core").InputSignal<string>` |
| cancelLabel | no | `import("@angular/core").InputSignal<string>` |
| intent | no | `import("@angular/core").InputSignal<"danger" \| "default">` |
| busy | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| showCloseButton | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| closeOnConfirm | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| confirmed | `import("@angular/core").OutputEmitterRef<void>` |
| cancelled | `import("@angular/core").OutputEmitterRef<void>` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |
