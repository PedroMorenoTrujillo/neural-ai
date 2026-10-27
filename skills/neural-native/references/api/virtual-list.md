# @neural-ui/native/virtual-list

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuVirtualListComponent

Selector: `neu-virtual-list`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| estimatedItemHeight | no | `import("@angular/core").InputSignal<number>` |
| height | no | `import("@angular/core").InputSignal<number>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| endReached | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
scrollToIndex(index: number): void;
scrollToTop(): void;
```

## NeuVirtualListItemContext

```typescript
export interface NeuVirtualListItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
    readonly disabled: boolean;
}
```

## NeuVirtualListItemDirective

Selector: `ng-template[neuVirtualListItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
