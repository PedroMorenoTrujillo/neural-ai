# @neural-ui/native/haptics

Verified against @neural-ui/native@0.1.0-beta.5. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NEU_HAPTICS_DRIVER

```typescript
NEU_HAPTICS_DRIVER: InjectionToken<NeuHapticsDriver | null>
```

## NEU_HAPTICS_OPTIONS

```typescript
NEU_HAPTICS_OPTIONS: InjectionToken<NeuHapticsOptions>
```

## NEU_NATIVE_HAPTICS

```typescript
NEU_NATIVE_HAPTICS: InjectionToken<NeuNativeHaptics | null>
```

## NeuHapticFeedback

```typescript
export type NeuHapticFeedback = 'press' | 'selection' | NeuHapticImpact | 'success' | 'warning' | 'error';
```

## NeuHapticImpact

```typescript
export type NeuHapticImpact = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';
```

## NeuHaptics

Supported imperative members:

```typescript
readonly enabled: import("@angular/core").WritableSignal<boolean>;
get available(): boolean;
play(feedback?: NeuHapticFeedback | false): boolean;
```

## NeuHapticsDriver

```typescript
export interface NeuHapticsDriver {
    available(): boolean;
    play(feedback: Exclude<NeuHapticFeedback, "press">): void | Promise<void>;
}
```

## NeuHapticsOptions

```typescript
export interface NeuHapticsOptions {
    enabled?: boolean;
    minimumIntervalMs?: number;
    pressStyle?: NeuHapticImpact;
}
```

## NeuNativeHaptics

```typescript
export interface NeuNativeHaptics {
    impactAsync(style: NeuHapticImpact): Promise<void>;
    notificationAsync(type: "success" | "warning" | "error"): Promise<void>;
    selectionAsync(): Promise<void>;
}
```

## provideNeuHaptics

```typescript
export declare function provideNeuHaptics(options?: NeuHapticsOptions): EnvironmentProviders;
```
