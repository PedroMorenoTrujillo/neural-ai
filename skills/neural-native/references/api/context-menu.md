# @neural-ui/native/context-menu

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuContextMenuComponent

Selector: `neu-context-menu`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| actionsLabel | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
| pressed | `import("@angular/core").OutputEmitterRef<void>` |
