# @neural-ui/native/meter-group

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuMeterGroupComponent

Selector: `neu-meter-group`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly value: number;
})[]>` |
| max | no | `import("@angular/core").InputSignal<number \| undefined>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
