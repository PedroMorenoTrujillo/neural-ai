# @neural-ui/native/modal

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuModalComponent

Selector: `neu-modal`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| title | yes | `import("@angular/core").InputSignal<string>` |
| dismissible | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| showCloseButton | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| closed | `import("@angular/core").OutputEmitterRef<"native" \| "action" \| "backdrop">` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
close(reason?: 'native' | 'action' | 'backdrop'): void;
```

## NeuModalFooterDirective

Selector: `ng-template[neuModalFooter]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuModalHeaderDirective

Selector: `ng-template[neuModalHeader]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
