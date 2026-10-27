# @neural-ui/native/bottom-sheet

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuBottomSheetComponent

Selector: `neu-bottom-sheet`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| title | yes | `import("@angular/core").InputSignal<string>` |
| dismissible | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| height | no | `import("@angular/core").InputSignal<NeuBottomSheetHeight>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| closed | `import("@angular/core").OutputEmitterRef<void>` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
close(): void;
```

## NeuBottomSheetHeight

```typescript
export type NeuBottomSheetHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';
```
