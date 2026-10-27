# @neural-ui/native/tree

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuTreeComponent

Selector: `neu-tree`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| nodes | no | `import("@angular/core").InputSignal<readonly NeuTreeNode[]>` |
| expanded | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| leafOnly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| expandLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| expandedChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |
