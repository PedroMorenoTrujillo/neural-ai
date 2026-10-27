# @neural-ui/native/carousel

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NeuCarouselComponent

Selector: `neu-carousel`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuImageItem[]>` |
| index | no | `import("@angular/core").ModelSignal<number>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| preview | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| viewerLabels | no | `import("@angular/core").InputSignal<NeuImageViewerLabels>` |
| loop | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| autoplay | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| autoplayInterval | no | `import("@angular/core").InputSignal<number>` |
| pauseLabel | no | `import("@angular/core").InputSignal<string>` |
| playLabel | no | `import("@angular/core").InputSignal<string>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| indexChange | `import("@angular/core").ModelSignal<number>` |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
