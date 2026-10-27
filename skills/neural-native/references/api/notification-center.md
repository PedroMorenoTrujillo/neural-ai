# @neural-ui/native/notification-center

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuNotificationCenterComponent

Selector: `neu-notification-center`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| readIds | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| markAllLabel | no | `import("@angular/core").InputSignal<string>` |
| unreadLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| readIdsChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
