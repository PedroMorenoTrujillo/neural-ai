# @neural-ui/native/skeleton

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuSkeletonAnimation

```typescript
export type NeuSkeletonAnimation = 'pulse' | 'none';
```

## NeuSkeletonComponent

Selector: `neu-skeleton`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| lines | no | `import("@angular/core").InputSignal<number>` |
| variant | no | `import("@angular/core").InputSignal<NeuSkeletonVariant>` |
| width | no | `import("@angular/core").InputSignal<string \| number \| undefined>` |
| height | no | `import("@angular/core").InputSignal<number \| undefined>` |
| borderRadius | no | `import("@angular/core").InputSignal<number>` |
| gap | no | `import("@angular/core").InputSignal<number>` |
| lastLineWidth | no | `import("@angular/core").InputSignal<string \| number>` |
| animation | no | `import("@angular/core").InputSignal<NeuSkeletonAnimation>` |

| Output | Type |
| --- | --- |

## NeuSkeletonVariant

```typescript
export type NeuSkeletonVariant = 'text' | 'rect' | 'circle';
```
