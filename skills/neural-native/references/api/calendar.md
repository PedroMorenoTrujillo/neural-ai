# @neural-ui/native/calendar

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

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
