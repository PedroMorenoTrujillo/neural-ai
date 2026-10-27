# @neural-ui/native/accordion

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuAccordionComponent

Selector: `neu-accordion`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| expanded | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| expandedChange | `import("@angular/core").ModelSignal<readonly string[]>` |
