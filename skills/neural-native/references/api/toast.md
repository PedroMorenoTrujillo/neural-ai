# @neural-ui/native/toast

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuToastComponent

Selector: `neu-toast`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| message | yes | `import("@angular/core").InputSignal<string>` |
| duration | no | `import("@angular/core").InputSignal<number>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| actionLabel | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| action | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |
