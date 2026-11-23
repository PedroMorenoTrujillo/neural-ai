# @neural-ui/core/tour

Verified against @neural-ui/core@2.1.0. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuTourComponent

Selector: `neu-tour`

| Input | Required | Type |
| --- | --- | --- |
| steps | yes | `import("@angular/core").InputSignal<readonly NeuTourStep[]>` |
| index | no | `import("@angular/core").InputSignal<number>` |
| open | no | `import("@angular/core").InputSignal<boolean>` |

| Output | Type |
| --- | --- |
| indexChange | `import("@angular/core").OutputEmitterRef<number>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |
| completed | `import("@angular/core").OutputEmitterRef<void>` |
| targetMissing | `import("@angular/core").OutputEmitterRef<string>` |

## NeuTourStep

```typescript
interface NeuTourStep {
    readonly title: string;
    readonly description: string;
    readonly targetId: string;
}
```

