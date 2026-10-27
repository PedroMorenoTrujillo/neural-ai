# @neural-ui/native/image-viewer

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuImageViewerComponent

Selector: `neu-image-viewer`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuImageItem[]>` |
| index | no | `import("@angular/core").ModelSignal<number>` |
| label | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| zoomLabel | no | `import("@angular/core").InputSignal<string>` |
| zoomOutLabel | no | `import("@angular/core").InputSignal<string>` |
| errorLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| indexChange | `import("@angular/core").ModelSignal<number>` |
| closed | `import("@angular/core").OutputEmitterRef<void>` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
close(): void;
```

## NeuImageViewerLabels

```typescript
export interface NeuImageViewerLabels {
    readonly label?: string;
    readonly closeLabel?: string;
    readonly previousLabel?: string;
    readonly nextLabel?: string;
    readonly zoomLabel?: string;
    readonly zoomOutLabel?: string;
    readonly errorLabel?: string;
}
```
