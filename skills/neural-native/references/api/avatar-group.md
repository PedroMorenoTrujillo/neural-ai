# @neural-ui/native/avatar-group

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuAvatarGroupComponent

Selector: `neu-avatar-group`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly uri?: string;
    readonly tone?: NeuTone;
})[]>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| moreLabel | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |

| Output | Type |
| --- | --- |
