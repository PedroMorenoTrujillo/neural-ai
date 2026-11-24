# @neural-ui/native/section-list

Verified against @neural-ui/native@0.1.0-beta.11. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuSectionListComponent

Selector: `neu-section-list`

| Input | Required | Type |
| --- | --- | --- |
| sections | no | `import("@angular/core").InputSignal<readonly NeuSectionListSection[]>` |
| height | no | `import("@angular/core").InputSignal<number>` |
| itemHeight | no | `import("@angular/core").InputSignal<number \| undefined>` |
| headerHeight | no | `import("@angular/core").InputSignal<number \| undefined>` |
| stickyHeaders | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| refreshEnabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| refreshing | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| refreshLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| selected | `import("@angular/core").OutputEmitterRef<NeuSectionListSelection>` |
| refresh | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSectionListSection

```typescript
export interface NeuSectionListSection {
    readonly key: string;
    readonly title: string;
    readonly data: readonly NeuOption[];
}
```

## NeuSectionListSelection

```typescript
export interface NeuSectionListSelection {
    readonly sectionKey: string;
    readonly itemId: string;
}
```
