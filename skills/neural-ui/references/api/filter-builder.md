# @neural-ui/core/filter-builder

Verified against @neural-ui/core@2.1.0. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuFilterBuilderComponent

Selector: `neu-filter-builder`

| Input | Required | Type |
| --- | --- | --- |
| fields | yes | `import("@angular/core").InputSignal<readonly NeuFilterBuilderField<F>[]>` |
| value | no | `import("@angular/core").InputSignal<NeuFilterExpression<F> \| null>` |
| readonly | no | `import("@angular/core").InputSignal<boolean>` |
| commit | no | `import("@angular/core").InputSignal<"explicit" \| "immediate">` |
| labels | no | `import("@angular/core").InputSignal<Partial<NeuFilterBuilderLabels>>` |
| editor | no | `import("@angular/core").InputSignal<TemplateRef<NeuFilterBuilderEditorContext<F>> \| null>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").OutputEmitterRef<NeuFilterExpression<F> \| null>` |

## NeuFilterBuilderEditorContext

```typescript
interface NeuFilterBuilderEditorContext<F extends string> {
    readonly $implicit: NeuFilterConstraint<F>;
    readonly field: NeuFilterBuilderField<F> | undefined;
    readonly readonly: boolean;
    readonly setValue: (value: unknown) => void;
}
```

## NeuFilterBuilderField

```typescript
interface NeuFilterBuilderField<F extends string> {
    readonly field: F;
    readonly label: string;
    readonly rules?: readonly NeuFilterConstraint<F>["rule"][];
    readonly type?: "text" | "number";
}
```

## NeuFilterBuilderLabels

```typescript
interface NeuFilterBuilderLabels {
    readonly root: string;
    readonly group: string;
    readonly operator: string;
    readonly all: string;
    readonly any: string;
    readonly field: string;
    readonly rule: string;
    readonly value: string;
    readonly addCondition: string;
    readonly addGroup: string;
    readonly remove: string;
    readonly reset: string;
    readonly apply: string;
    readonly invalidValue: string;
    readonly rules: Record<NeuFilterConstraint<string>["rule"], string>;
}
```

