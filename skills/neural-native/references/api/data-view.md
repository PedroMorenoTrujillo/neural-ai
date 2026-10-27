# @neural-ui/native/data-view

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuDataViewComponent

Selector: `neu-data-view`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| itemTemplate | no | `import("@angular/core").InputSignal<TemplateRef<NeuDataViewItemContext> \| undefined>` |
| query | no | `import("@angular/core").ModelSignal<string>` |
| descending | no | `import("@angular/core").ModelSignal<boolean>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| searchLabel | no | `import("@angular/core").InputSignal<string>` |
| sortLabel | no | `import("@angular/core").InputSignal<string>` |
| refreshLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| queryChange | `import("@angular/core").ModelSignal<string>` |
| descendingChange | `import("@angular/core").ModelSignal<boolean>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| refresh | `import("@angular/core").OutputEmitterRef<void>` |

## NeuDataViewItemContext

```typescript
export interface NeuDataViewItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
}
```

## NeuDataViewItemDirective

Selector: `ng-template[neuDataViewItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
