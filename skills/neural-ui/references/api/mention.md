# @neural-ui/core/mention

Verified against @neural-ui/core@2.1.0. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuMentionComponent

Selector: `neu-mention`

| Input | Required | Type |
| --- | --- | --- |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| suggestions | no | `import("@angular/core").InputSignal<readonly NeuMentionSuggestion[]>` |
| suggestionsLabel | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignal<boolean>` |
| readonly | no | `import("@angular/core").InputSignal<boolean>` |
| required | no | `import("@angular/core").InputSignal<boolean>` |
| invalid | no | `import("@angular/core").InputSignal<boolean>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| queryChange | `import("@angular/core").OutputEmitterRef<string \| null>` |
| suggestionSelected | `import("@angular/core").OutputEmitterRef<NeuMentionSuggestion>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuMentionSuggestion

```typescript
interface NeuMentionSuggestion {
    readonly value: string;
    readonly label: string;
}
```

