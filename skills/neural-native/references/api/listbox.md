# @neural-ui/native/listbox

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuListboxComponent

Selector: `neu-listbox`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| appearance | no | `import("@angular/core").InputSignal<"cards" \| "plain">` |
| itemTemplate | no | `import("@angular/core").InputSignal<TemplateRef<NeuListboxItemContext> \| undefined>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuListboxItemContext

```typescript
export interface NeuListboxItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
    readonly selected: boolean;
    readonly disabled: boolean;
}
```

## NeuListboxItemDirective

Selector: `ng-template[neuListboxItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
