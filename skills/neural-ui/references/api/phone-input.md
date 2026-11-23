# @neural-ui/core/phone-input

Verified against @neural-ui/core@2.1.0. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## createNeuPhoneInputValue

```typescript
export declare function createNeuPhoneInputValue(raw: string, region: NeuPhoneRegion): NeuPhoneInputValue | null;
```

## NeuPhoneInputComponent

Selector: `neu-phone-input`

| Input | Required | Type |
| --- | --- | --- |
| value | no | `import("@angular/core").ModelSignal<NeuPhoneInputValue \| null>` |
| defaultRegion | no | `import("@angular/core").InputSignal<import("libphonenumber-js/max").CountryCode>` |
| label | no | `import("@angular/core").InputSignal<string>` |
| name | no | `import("@angular/core").InputSignal<string>` |
| hint | no | `import("@angular/core").InputSignal<string>` |
| errorMessage | no | `import("@angular/core").InputSignal<string>` |
| disabled | no | `import("@angular/core").InputSignal<boolean>` |
| readonly | no | `import("@angular/core").InputSignal<boolean>` |
| hidden | no | `import("@angular/core").InputSignal<boolean>` |
| invalid | no | `import("@angular/core").InputSignal<boolean>` |
| required | no | `import("@angular/core").InputSignal<boolean>` |
| errors | no | `import("@angular/core").InputSignal<readonly ValidationError.WithOptionalFieldTree[]>` |

| Output | Type |
| --- | --- |
| valueChange | `import("@angular/core").ModelSignal<NeuPhoneInputValue \| null>` |
| touch | `import("@angular/core").OutputEmitterRef<void>` |

## NeuPhoneInputValue

```typescript
export interface NeuPhoneInputValue {
    readonly region: NeuPhoneRegion;
    readonly raw: string;
    readonly e164: string | null;
}
```

## NeuPhoneRegion

```typescript
export type NeuPhoneRegion = CountryCode;
```

