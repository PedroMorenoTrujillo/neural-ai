# @neural-ui/native/stepper

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuStepperComponent

Selector: `neu-stepper`

| Input | Required | Type |
| --- | --- | --- |
| steps | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| activeStep | no | `import("@angular/core").ModelSignal<number>` |
| linear | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| completed | no | `import("@angular/core").InputSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| finishLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| activeStepChange | `import("@angular/core").ModelSignal<number>` |
| finished | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
goTo(index: number): void;
```
