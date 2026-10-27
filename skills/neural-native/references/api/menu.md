# @neural-ui/native/menu

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuMenuComponent

Selector: `neu-menu`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| showTrigger | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
