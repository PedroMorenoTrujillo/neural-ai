# @neural-ui/native

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## formatMask

```typescript
export declare function formatMask(value: string, mask: string): {
    raw: string;
    display: string;
};
```

## NEU_CHECK_ICON

```typescript
NEU_CHECK_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m5 12 4 4 10-10\"/></svg>"
```

## NEU_DARK_TOKENS

```typescript
NEU_DARK_TOKENS: Readonly<NeuTokens>
```

## NEU_FILE_PICKER

```typescript
NEU_FILE_PICKER: InjectionToken<NeuFilePicker>
```

## NEU_LIGHT_TOKENS

```typescript
NEU_LIGHT_TOKENS: Readonly<NeuTokens>
```

## NEU_PLUS_ICON

```typescript
NEU_PLUS_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>"
```

## NEU_TABS

```typescript
NEU_TABS: InjectionToken<{
    value: Signal<string>;
    tabs?: Signal<readonly NeuOption[]>;
}>
```

## NEU_THEME

```typescript
NEU_THEME: InjectionToken<Signal<Readonly<NeuTokens>>>
```

## NeuAccordionComponent

Selector: `neu-accordion`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| expanded | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| expandedChange | `import("@angular/core").ModelSignal<readonly string[]>` |

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

## NeuAutocompleteComponent

Selector: `neu-autocomplete`

| Input | Required | Type |
| --- | --- | --- |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| minLength | no | `import("@angular/core").InputSignal<number>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuAvatarComponent

Selector: `neu-avatar`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| uri | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |

| Output | Type |
| --- | --- |

## NeuAvatarGroupComponent

Selector: `neu-avatar-group`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly uri?: string;
    readonly tone?: NeuTone;
})[]>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| moreLabel | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |

| Output | Type |
| --- | --- |

## NeuBadgeComponent

Selector: `neu-badge`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |

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

## NeuButtonComponent

Selector: `neu-button`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| accessibilityLabel | no | `import("@angular/core").InputSignal<string>` |
| variant | no | `import("@angular/core").InputSignal<NeuVariant>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |
| fullWidth | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| pressed | `import("@angular/core").OutputEmitterRef<import("@ng-native/components").TouchEvent>` |

## NeuButtonGroupComponent

Selector: `neu-button-group`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
| activated | `import("@angular/core").OutputEmitterRef<string>` |

## NeuCalendarComponent

Selector: `neu-calendar`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| month | no | `import("@angular/core").ModelSignal<string>` |
| locale | no | `import("@angular/core").InputSignal<string>` |
| firstDay | no | `import("@angular/core").InputSignal<number>` |
| min | no | `import("@angular/core").InputSignal<string>` |
| max | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearsLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearsLabel | no | `import("@angular/core").InputSignal<string>` |
| events | no | `import("@angular/core").InputSignal<readonly NeuCalendarEvent[]>` |
| showAgenda | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| editable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| agendaLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyAgendaLabel | no | `import("@angular/core").InputSignal<string>` |
| hasEventsLabel | no | `import("@angular/core").InputSignal<string>` |
| addEventLabel | no | `import("@angular/core").InputSignal<string>` |
| editEventLabel | no | `import("@angular/core").InputSignal<string>` |
| deleteEventLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| monthChange | `import("@angular/core").ModelSignal<string>` |
| eventCreateRequested | `import("@angular/core").OutputEmitterRef<string>` |
| eventEditRequested | `import("@angular/core").OutputEmitterRef<NeuCalendarEvent>` |
| eventDeleteRequested | `import("@angular/core").OutputEmitterRef<NeuCalendarEvent>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuCalendarEvent

```typescript
export interface NeuCalendarEvent extends NeuOption {
    readonly date: string;
}
```

## NeuCardComponent

Selector: `neu-card`

| Input | Required | Type |
| --- | --- | --- |
| title | no | `import("@angular/core").InputSignal<string>` |
| description | no | `import("@angular/core").InputSignal<string>` |
| variant | no | `import("@angular/core").InputSignal<"tonal" \| "surface" \| "outlined">` |

| Output | Type |
| --- | --- |

## NeuCardFooterDirective

Selector: `[neuCardFooter]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuCardHeaderDirective

Selector: `[neuCardHeader]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

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

## NeuCascadeSelectComponent

Selector: `neu-cascade-select`

| Input | Required | Type |
| --- | --- | --- |
| nodes | no | `import("@angular/core").InputSignal<readonly NeuTreeNode[]>` |
| backLabel | no | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| rootLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuCheckboxComponent

Selector: `neu-checkbox`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| labelPosition | no | `import("@angular/core").InputSignal<"left" \| "right">` |
| checked | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| checkedChange | `import("@angular/core").ModelSignal<boolean>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuChipComponent

Selector: `neu-chip`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| selected | no | `import("@angular/core").ModelSignal<boolean>` |
| selectable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| removable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| selectedChange | `import("@angular/core").ModelSignal<boolean>` |
| removed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuColorScheme

```typescript
export type NeuColorScheme = 'system' | 'light' | 'dark';
```

## NeuConfirmDialogComponent

Selector: `neu-confirm-dialog`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| title | yes | `import("@angular/core").InputSignal<string>` |
| message | yes | `import("@angular/core").InputSignal<string>` |
| confirmLabel | no | `import("@angular/core").InputSignal<string>` |
| cancelLabel | no | `import("@angular/core").InputSignal<string>` |
| intent | no | `import("@angular/core").InputSignal<"danger" \| "default">` |
| busy | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| showCloseButton | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| closeOnConfirm | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| confirmed | `import("@angular/core").OutputEmitterRef<void>` |
| cancelled | `import("@angular/core").OutputEmitterRef<void>` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuContextMenuComponent

Selector: `neu-context-menu`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| actionsLabel | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |
| pressed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuDataViewComponent

Selector: `neu-data-view`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| itemTemplate | no | `import("@angular/core").InputSignal<TemplateRef<NeuDataViewItemContext> \| undefined>` |
| query | no | `import("@angular/core").ModelSignal<string>` |
| descending | no | `import("@angular/core").ModelSignal<boolean>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| searchLabel | no | `import("@angular/core").InputSignal<string>` |
| sortLabel | no | `import("@angular/core").InputSignal<string>` |
| refreshLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| queryChange | `import("@angular/core").ModelSignal<string>` |
| descendingChange | `import("@angular/core").ModelSignal<boolean>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| refresh | `import("@angular/core").OutputEmitterRef<void>` |

## NeuDataViewItemContext

```typescript
export interface NeuDataViewItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
}
```

## NeuDataViewItemDirective

Selector: `ng-template[neuDataViewItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuDateInputComponent

Selector: `neu-date-input`

| Input | Required | Type |
| --- | --- | --- |
| min | no | `import("@angular/core").InputSignal<string>` |
| max | no | `import("@angular/core").InputSignal<string>` |
| locale | no | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| previousLabel | no | `import("@angular/core").InputSignal<string>` |
| nextLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearLabel | no | `import("@angular/core").InputSignal<string>` |
| previousYearsLabel | no | `import("@angular/core").InputSignal<string>` |
| nextYearsLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuDividerComponent

Selector: `neu-divider`

| Input | Required | Type |
| --- | --- | --- |
| orientation | no | `import("@angular/core").InputSignal<"horizontal" \| "vertical">` |

| Output | Type |
| --- | --- |

## NeuEmptyStateComponent

Selector: `neu-empty-state`

| Input | Required | Type |
| --- | --- | --- |
| title | yes | `import("@angular/core").InputSignal<string>` |
| description | no | `import("@angular/core").InputSignal<string>` |
| actionLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| action | `import("@angular/core").OutputEmitterRef<void>` |

## NeuFile

```typescript
export interface NeuFile {
    readonly uri: string;
    readonly name: string;
    readonly size?: number;
    readonly mimeType?: string;
}
```

## NeuFilePicker

```typescript
export interface NeuFilePicker {
    pick(options: {
        type: readonly string[];
        multiple: boolean;
    }): Promise<readonly NeuFile[] | null>;
}
```

## NeuFilterBarComponent

Selector: `neu-filter-bar`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| query | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| searchLabel | no | `import("@angular/core").InputSignal<string>` |
| clearLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| queryChange | `import("@angular/core").ModelSignal<string>` |

## NeuFormFieldComponent

Selector: `neu-form-field`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| hint | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |

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

## NeuIconButtonComponent

Selector: `neu-icon-button`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| svg | yes | `import("@angular/core").InputSignal<string>` |
| variant | no | `import("@angular/core").InputSignal<NeuVariant>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| loading | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| pressed | `import("@angular/core").OutputEmitterRef<import("@ng-native/components").TouchEvent>` |

## NeuImageItem

```typescript
export interface NeuImageItem {
    readonly id: string;
    readonly uri: string;
    readonly label: string;
}
```

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

## NeuInlineEditorComponent

Selector: `neu-inline-editor`

| Input | Required | Type |
| --- | --- | --- |
| editing | no | `import("@angular/core").ModelSignal<boolean>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| saveLabel | no | `import("@angular/core").InputSignal<string>` |
| cancelLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| editingChange | `import("@angular/core").ModelSignal<boolean>` |
| saved | `import("@angular/core").OutputEmitterRef<string>` |
| cancelled | `import("@angular/core").OutputEmitterRef<void>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuInputComponent

Selector: `neu-input`

| Input | Required | Type |
| --- | --- | --- |
| keyboardType | no | `import("@angular/core").InputSignal<"default" \| "email-address" \| "numeric" \| "phone-pad">` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| maxLength | no | `import("@angular/core").InputSignalWithTransform<number \| undefined, number \| undefined>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuInputMaskComponent

Selector: `neu-input-mask`

| Input | Required | Type |
| --- | --- | --- |
| mask | yes | `import("@angular/core").InputSignal<string>` |
| keyboardType | no | `import("@angular/core").InputSignal<"default" \| "numeric" \| "phone-pad">` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuInputOtpComponent

Selector: `neu-input-otp`

| Input | Required | Type |
| --- | --- | --- |
| length | no | `import("@angular/core").InputSignal<number>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| completed | `import("@angular/core").OutputEmitterRef<string>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuInputTagsComponent

Selector: `neu-input-tags`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| addLabel | no | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuListboxComponent

Selector: `neu-listbox`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| appearance | no | `import("@angular/core").InputSignal<"cards" \| "plain">` |
| itemTemplate | no | `import("@angular/core").InputSignal<TemplateRef<NeuListboxItemContext> \| undefined>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuListboxItemContext

```typescript
export interface NeuListboxItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
    readonly selected: boolean;
    readonly disabled: boolean;
}
```

## NeuListboxItemDirective

Selector: `ng-template[neuListboxItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuMenuComponent

Selector: `neu-menu`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| showTrigger | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |

## NeuMeterGroupComponent

Selector: `neu-meter-group`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly value: number;
})[]>` |
| max | no | `import("@angular/core").InputSignal<number \| undefined>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |

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

## NeuNavComponent

Selector: `neu-nav`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuNavItem[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| navigate | `import("@angular/core").OutputEmitterRef<string>` |

## NeuNavItem

```typescript
export interface NeuNavItem extends NeuOption {
    readonly svg?: string;
}
```

## NeuNotificationCenterComponent

Selector: `neu-notification-center`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| readIds | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| markAllLabel | no | `import("@angular/core").InputSignal<string>` |
| unreadLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| readIdsChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |

## NeuNumberInputComponent

Selector: `neu-number-input`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<number>` |
| min | no | `import("@angular/core").InputSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| step | no | `import("@angular/core").InputSignal<number>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| decreaseLabel | no | `import("@angular/core").InputSignal<string>` |
| increaseLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<number>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuOption

```typescript
export interface NeuOption {
    readonly id: string;
    readonly label: string;
    readonly description?: string;
    readonly disabled?: boolean;
}
```

## NeuPanelComponent

Selector: `neu-panel`

| Input | Required | Type |
| --- | --- | --- |
| title | yes | `import("@angular/core").InputSignal<string>` |
| collapsed | no | `import("@angular/core").ModelSignal<boolean>` |
| collapsible | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| collapsedChange | `import("@angular/core").ModelSignal<boolean>` |

## NeuPanelFooterDirective

Selector: `[neuPanelFooter]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuPanelHeaderDirective

Selector: `[neuPanelHeader]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuPasswordComponent

Selector: `neu-password`

| Input | Required | Type |
| --- | --- | --- |
| revealed | no | `import("@angular/core").ModelSignal<boolean>` |
| showLabel | no | `import("@angular/core").InputSignal<string>` |
| hideLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| revealedChange | `import("@angular/core").ModelSignal<boolean>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuPickListComponent

Selector: `neu-pick-list`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| selectedLabel | no | `import("@angular/core").InputSignal<string>` |
| availableLabel | no | `import("@angular/core").InputSignal<string>` |
| upLabel | no | `import("@angular/core").InputSignal<string>` |
| downLabel | no | `import("@angular/core").InputSignal<string>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |
| addLabel | no | `import("@angular/core").InputSignal<string>` |
| emptySelectedLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyAvailableLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuPopoverComponent

Selector: `neu-popover`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| title | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| dismissLabel | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |

## NeuProgressBarComponent

Selector: `neu-progress-bar`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").InputSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |

## NeuRadioGroupComponent

Selector: `neu-radio`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuRatingComponent

Selector: `neu-rating`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| clearable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| clearLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<number>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSelectComponent

Selector: `neu-select`

| Input | Required | Type |
| --- | --- | --- |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| values | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| searchable | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| searchLabel | no | `import("@angular/core").InputSignal<string>` |
| searchPlaceholder | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valuesChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSelectItemContext

```typescript
export type NeuSelectItemContext = NeuListboxItemContext;
```

## NeuSelectItemDirective

Selector: `ng-template[neuSelectItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuSelectSelectedContext

```typescript
export interface NeuSelectSelectedContext {
    readonly $implicit: readonly NeuOption[];
    readonly value: string;
    readonly values: readonly string[];
    readonly placeholder: string;
}
```

## NeuSelectSelectedDirective

Selector: `ng-template[neuSelectSelected]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |

## NeuSidebarComponent

Selector: `neu-sidebar`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| title | yes | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| fullWidth | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| navigate | `import("@angular/core").OutputEmitterRef<string>` |
| opened | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSize

```typescript
export type NeuSize = 'sm' | 'md' | 'lg';
```

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

## NeuSliderComponent

Selector: `neu-slider`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<number>` |
| min | no | `import("@angular/core").InputSignal<number>` |
| max | no | `import("@angular/core").InputSignal<number>` |
| step | no | `import("@angular/core").InputSignal<number>` |
| showButtons | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| increaseLabel | no | `import("@angular/core").InputSignal<string>` |
| decreaseLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<number>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuSpeedDialAction

```typescript
export interface NeuSpeedDialAction extends NeuOption {
    readonly svg?: string;
}
```

## NeuSpeedDialComponent

Selector: `neu-speed-dial`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| actions | no | `import("@angular/core").InputSignal<readonly NeuSpeedDialAction[]>` |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| activated | `import("@angular/core").OutputEmitterRef<string>` |

## NeuSpinnerComponent

Selector: `neu-spinner`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| size | no | `import("@angular/core").InputSignal<"small" \| "large">` |
| active | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| showLabel | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |

## NeuStatsCardComponent

Selector: `neu-stats-card`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| value | yes | `import("@angular/core").InputSignal<string \| number>` |
| change | no | `import("@angular/core").InputSignal<string>` |
| description | no | `import("@angular/core").InputSignal<string>` |
| svg | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |

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

## NeuSwitchComponent

Selector: `neu-switch`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| labelPosition | no | `import("@angular/core").InputSignal<"left" \| "right">` |
| size | no | `import("@angular/core").InputSignal<NeuSize>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| checked | no | `import("@angular/core").ModelSignal<boolean>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| checkedChange | `import("@angular/core").ModelSignal<boolean>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuTabPanelComponent

Selector: `neu-tab-panel`

| Input | Required | Type |
| --- | --- | --- |
| id | yes | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |

## NeuTabsComponent

Selector: `neu-tabs`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| tabs | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignal<boolean>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |

## NeuTextareaComponent

Selector: `neu-textarea`

| Input | Required | Type |
| --- | --- | --- |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| maxLength | no | `import("@angular/core").InputSignalWithTransform<number \| undefined, number \| undefined>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuThemeComponent

Selector: `neu-theme`

| Input | Required | Type |
| --- | --- | --- |
| scheme | no | `import("@angular/core").InputSignal<NeuColorScheme>` |
| tokens | no | `import("@angular/core").InputSignal<Partial<NeuTokens>>` |

| Output | Type |
| --- | --- |

Supported imperative members:

```typescript
readonly resolvedTokens: import("@angular/core").Signal<Readonly<NeuTokens>>;
```

## NeuTimelineComponent

Selector: `neu-timeline`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| completedLabel | no | `import("@angular/core").InputSignal<string>` |
| pendingLabel | no | `import("@angular/core").InputSignal<string>` |
| items | no | `import("@angular/core").InputSignal<readonly (NeuOption & {
    readonly date?: string;
    readonly done?: boolean;
})[]>` |

| Output | Type |
| --- | --- |

## NeuToastComponent

Selector: `neu-toast`

| Input | Required | Type |
| --- | --- | --- |
| open | no | `import("@angular/core").ModelSignal<boolean>` |
| message | yes | `import("@angular/core").InputSignal<string>` |
| duration | no | `import("@angular/core").InputSignal<number>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| actionLabel | no | `import("@angular/core").InputSignal<string>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
| openChange | `import("@angular/core").ModelSignal<boolean>` |
| action | `import("@angular/core").OutputEmitterRef<void>` |
| dismissed | `import("@angular/core").OutputEmitterRef<void>` |

## NeuToggleButtonGroupComponent

Selector: `neu-toggle-button-group`

| Input | Required | Type |
| --- | --- | --- |
| label | yes | `import("@angular/core").InputSignal<string>` |
| options | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| value | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| tone | no | `import("@angular/core").InputSignal<NeuTone>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuTokens

```typescript
export interface NeuTokens {
    accent: string;
    onAccent: string;
    surface: string;
    canvas: string;
    text: string;
    muted: string;
    border: string;
    tonal: string;
    danger: string;
    success: string;
    warning: string;
    warningText: string;
    onWarning: string;
    info: string;
    accentText?: string;
    dangerText?: string;
    successText?: string;
    infoText?: string;
    radius: number;
    spacing: number;
    fontSize: number;
    duration: number;
    surfaceBorder?: string;
    divider?: string;
    surfaceSecondary?: string;
    mediaCanvas?: string;
    mediaText?: string;
    mediaBarStyle?: "light" | "dark";
}
```

## NeuTone

```typescript
export type NeuTone = 'neutral' | 'brand' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
```

## NeuToolbarAction

```typescript
export interface NeuToolbarAction extends NeuOption {
    readonly svg?: string;
}
```

## NeuToolbarComponent

Selector: `neu-toolbar`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| actions | no | `import("@angular/core").InputSignal<readonly NeuToolbarAction[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |

| Output | Type |
| --- | --- |
| activated | `import("@angular/core").OutputEmitterRef<string>` |

## NeuTreeComponent

Selector: `neu-tree`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| nodes | no | `import("@angular/core").InputSignal<readonly NeuTreeNode[]>` |
| expanded | no | `import("@angular/core").ModelSignal<readonly string[]>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| leafOnly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| expandLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| expandedChange | `import("@angular/core").ModelSignal<readonly string[]>` |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuTreeNode

```typescript
export interface NeuTreeNode extends NeuOption {
    readonly children?: readonly NeuTreeNode[];
}
```

## NeuTreeSelectComponent

Selector: `neu-tree-select`

| Input | Required | Type |
| --- | --- | --- |
| nodes | no | `import("@angular/core").InputSignal<readonly NeuTreeNode[]>` |
| leafOnly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| placeholder | no | `import("@angular/core").InputSignal<string>` |
| closeLabel | no | `import("@angular/core").InputSignal<string>` |
| expandLabel | no | `import("@angular/core").InputSignal<string>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |
| value | no | `import("@angular/core").ModelSignal<string>` |
| label | yes | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| readonly | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| invalid | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| touched | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| required | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| requiredLabel | no | `import("@angular/core").InputSignal<string>` |
| error | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<string>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuUpload

```typescript
export type NeuUpload = (file: NeuFile, progress: (percent: number) => void, signal: AbortSignal) => Promise<void>;
```

## NeuUploaderComponent

Selector: `neu-uploader`

| Input | Required | Type |
| --- | --- | --- |
| label | no | `import("@angular/core").InputSignal<string>` |
| files | no | `import("@angular/core").ModelSignal<readonly NeuUploadItem[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| types | no | `import("@angular/core").InputSignal<readonly string[]>` |
| multiple | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| maxFiles | no | `import("@angular/core").InputSignal<number>` |
| maxBytes | no | `import("@angular/core").InputSignal<number>` |
| chooseLabel | no | `import("@angular/core").InputSignal<string>` |
| uploadLabel | no | `import("@angular/core").InputSignal<string>` |
| removeLabel | no | `import("@angular/core").InputSignal<string>` |
| stateLabels | no | `import("@angular/core").InputSignal<Readonly<Record<"selected" \| "uploading" \| "complete" \| "error", string>>>` |
| upload | no | `import("@angular/core").InputSignal<NeuUpload \| undefined>` |

| Output | Type |
| --- | --- |
| filesChange | `import("@angular/core").ModelSignal<readonly NeuUploadItem[]>` |
| selected | `import("@angular/core").OutputEmitterRef<readonly NeuFile[]>` |
| completed | `import("@angular/core").OutputEmitterRef<NeuFile>` |
| rejected | `import("@angular/core").OutputEmitterRef<string>` |

## NeuUploadItem

```typescript
export interface NeuUploadItem {
    readonly id: string;
    readonly file: NeuFile;
    readonly state: "selected" | "uploading" | "complete" | "error";
    readonly progress: number;
    readonly error?: string;
}
```

## NeuVariant

```typescript
export type NeuVariant = 'solid' | 'tonal' | 'outline' | 'text';
```

## NeuVirtualListComponent

Selector: `neu-virtual-list`

| Input | Required | Type |
| --- | --- | --- |
| items | no | `import("@angular/core").InputSignal<readonly NeuOption[]>` |
| disabled | no | `import("@angular/core").InputSignalWithTransform<boolean, unknown>` |
| estimatedItemHeight | no | `import("@angular/core").InputSignal<number>` |
| height | no | `import("@angular/core").InputSignal<number>` |
| emptyLabel | no | `import("@angular/core").InputSignal<string>` |

| Output | Type |
| --- | --- |
| selected | `import("@angular/core").OutputEmitterRef<string>` |
| endReached | `import("@angular/core").OutputEmitterRef<void>` |

Supported imperative members:

```typescript
scrollToIndex(index: number): void;
scrollToTop(): void;
```

## NeuVirtualListItemContext

```typescript
export interface NeuVirtualListItemContext {
    readonly $implicit: NeuOption;
    readonly index: number;
    readonly disabled: boolean;
}
```

## NeuVirtualListItemDirective

Selector: `ng-template[neuVirtualListItem]`

| Input | Required | Type |
| --- | --- | --- |

| Output | Type |
| --- | --- |
