# @neural-ui/native/alert

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuAlertComponent

Selector: `neu-alert`

| Input | Required | Type |
| --- | --- | --- |
| title | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| variant | no | `import("@angular/core").InputSignal<NeuAlertVariant>` |
| showIcon | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| svg | no | `import("@angular/core").InputSignal<string>` |
| message | yes | `import("@angular/core").InputSignal<string>` |
| visible | no | `import("@angular/core").ModelSignal<boolean>` |
| closable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| visibleChange | `import("@angular/core").ModelSignal<boolean>` |
| closed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuAlertVariant

```typescript
export type NeuAlertVariant = 'soft' | 'outline';
```
