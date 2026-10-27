# @neural-ui/native/timeline

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuTimelineComponent

Selector: `neu-timeline`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| completedLabel | no | `import("@angular/core").InputSignal<string>` |
| pendingLabel | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly date?: string;
    readonly done?: boolean;
})[]>` |

| Output | Type |
| --- | --- |
