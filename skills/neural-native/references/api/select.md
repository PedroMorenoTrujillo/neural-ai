# @neural-ui/native/select

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuSelectComponent

Selector: `neu-select`

| Input | Required | Type |
| --- | --- | --- |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| values | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| searchable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| searchLabel | no | `import("@angular/core").InputSignal<string>` |
| searchPlaceholder | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valuesChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSelectItemContext

```typescript
export type NeuSelectItemContext = NeuListboxItemContext;
```

## NeuSelectItemDirective

Selector: `ng-template[neuSelectItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuSelectSelectedContext

```typescript
export interface NeuSelectSelectedContext {
    readonly $implicit: readonly NeuOption[];
    readonly value: string;
    readonly values: readonly string[];
    readonly placeholder: string;
}
```

## NeuSelectSelectedDirective

Selector: `ng-template[neuSelectSelected]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
