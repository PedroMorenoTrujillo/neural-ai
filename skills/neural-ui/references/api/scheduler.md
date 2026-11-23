# @neural-ui/core/scheduler

Verified against @neural-ui/core@2.1.0. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## Draft

```typescript
interface Draft {
    readonly id: string | null;
    readonly originalStart: number | null;
    readonly title: string;
    readonly start: string;
    readonly duration: number;
}
```

## NeuSchedulerComponent

Selector: `neu-scheduler`

| Input | Required | Type |
| --- | --- | --- |
| date | yes | `import("@angular/core").InputSignal<string>` |
| timeZone | no | `import("@angular/core").InputSignal<string>` |
| view | no | `import("@angular/core").InputSignal<NeuSchedulerView>` |
| events | no | `import("@angular/core").InputSignal<readonly NeuSchedulerEvent[]>` |
| readonly | no | `import("@angular/core").InputSignal<boolean>` |

| Output | Type |
| --- | --- |
| dateChange | `import("@angular/core").OutputEmitterRef<string>` |
| viewChange | `import("@angular/core").OutputEmitterRef<NeuSchedulerView>` |
| eventChange | `import("@angular/core").OutputEmitterRef<NeuSchedulerEventProposal>` |

## NeuSchedulerEvent

```typescript
export interface NeuSchedulerEvent {
    readonly id: string;
    readonly title: string;
    readonly start: number;
    readonly end: number;
}
```

## NeuSchedulerEventProposal

```typescript
export type NeuSchedulerEventProposal = {
    readonly kind: 'create';
    readonly event: Omit<NeuSchedulerEvent, 'id'>;
} | {
    readonly kind: 'update';
    readonly id: string;
    readonly event: Omit<NeuSchedulerEvent, 'id'>;
};
```

## NeuSchedulerView

```typescript
export type NeuSchedulerView = 'day' | 'week';
```

