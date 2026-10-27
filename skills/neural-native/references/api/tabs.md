# @neural-ui/native/tabs

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NEU_TABS

```typescript
NEU_TABS: InjectionToken<{
    value: Signal<string>;
    tabs?: Signal<readonly NeuOption[]>;
}>
```

## NeuTabPanelComponent

Selector: `neu-tab-panel`

| Input | Required | Type |
| --- | --- | --- |
| id | yes | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |

## NeuTabsComponent

Selector: `neu-tabs`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| tabs | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignal<boolean>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
