# @neural-ui/native/input-tags

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuInputTagsComponent

Selector: `neu-input-tags`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| addLabel | no | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
