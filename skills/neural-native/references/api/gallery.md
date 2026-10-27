# @neural-ui/native/gallery

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuGalleryCaptionDirective

Selector: `ng-template[neuGalleryCaption]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuGalleryComponent

Selector: `neu-gallery`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| viewerLabels | no | `import("@angular/core").InputSignal<NeuGalleryViewerLabels>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuImageItem[]>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| layout | no | `import("@angular/core").InputSignal<NeuGalleryLayout>` |
| columns | no | `import("@angular/core").InputSignal<number>` |
| gap | no | `import("@angular/core").InputSignal<number>` |
| aspectRatio | no | `import("@angular/core").InputSignal<number>` |
| borderRadius | no | `import("@angular/core").InputSignal<number>` |
| showCaptions | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| index | no | `import("@angular/core").ModelSignal<number>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| indexChange | `import("@angular/core").ModelSignal<number>` |
| openChange | `import("@angular/core").ModelSignal<boolean>` |

## NeuGalleryItemContext

```typescript
export interface NeuGalleryItemContext {
    readonly $implicit: NeuImageItem;
    readonly index: number;
    readonly aspectRatio: number;
    readonly borderRadius: number;
}
```

## NeuGalleryItemDirective

Selector: `ng-template[neuGalleryItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuGalleryLayout

```typescript
export type NeuGalleryLayout = 'grid' | 'mosaic';
```

## NeuGalleryViewerLabels

```typescript
export interface NeuGalleryViewerLabels {
    readonly label?: string;
    readonly closeLabel?: string;
    readonly previousLabel?: string;
    readonly nextLabel?: string;
    readonly zoomLabel?: string;
    readonly zoomOutLabel?: string;
    readonly errorLabel?: string;
}
```
