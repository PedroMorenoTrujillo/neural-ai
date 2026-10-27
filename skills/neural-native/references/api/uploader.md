# @neural-ui/native/uploader

Verified against @neural-ui/native@0.1.0-beta.2. Generated; do not edit.

Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.

## NEU_FILE_PICKER

```typescript
NEU_FILE_PICKER: InjectionToken<NeuFilePicker>
```

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
