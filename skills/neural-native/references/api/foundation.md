# @neural-ui/native/foundation

Verified against @neural-ui/native@0.1.0-beta.5. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NEU_CHECK_ICON

```typescript
NEU_CHECK_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m5 12 4 4 10-10\"/></svg>"
```

## NEU_DARK_TOKENS

```typescript
NEU_DARK_TOKENS: Readonly<NeuTokens>
```

## NEU_HAPTICS_DRIVER

```typescript
NEU_HAPTICS_DRIVER: InjectionToken<NeuHapticsDriver | null>
```

## NEU_HAPTICS_OPTIONS

```typescript
NEU_HAPTICS_OPTIONS: InjectionToken<NeuHapticsOptions>
```

## NEU_LIGHT_TOKENS

```typescript
NEU_LIGHT_TOKENS: Readonly<NeuTokens>
```

## NEU_PLUS_ICON

```typescript
NEU_PLUS_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg>"
```

## NEU_THEME

```typescript
NEU_THEME: InjectionToken<Signal<Readonly<NeuTokens>>>
```

## NeuColorScheme

```typescript
export type NeuColorScheme = 'system' | 'light' | 'dark';
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

## NeuSize

```typescript
export type NeuSize = 'sm' | 'md' | 'lg';
```

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

## NeuVariant

```typescript
export type NeuVariant = 'solid' | 'tonal' | 'outline' | 'text';
```
