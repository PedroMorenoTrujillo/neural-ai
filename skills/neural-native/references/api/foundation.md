# @neural-ui/native/foundation

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NEU_CHECK_ICON

```typescript
NEU_CHECK_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m5 12 4 4 10-10\"/></svg>"
```

## NEU_DARK_TOKENS

```typescript
NEU_DARK_TOKENS: Readonly<NeuTokens>
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
