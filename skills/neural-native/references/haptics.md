# Optional native haptic feedback

Available from `@neural-ui/native@0.1.0-beta.5`. Feedback is off unless the application opts in. Ordinary component imports do not load the optional adapter.

For a native app, install the compatible module and rebuild the application:

```sh
npx expo install expo-haptics
```

Add the provider to the existing Angular Native `mount()` options, preserving the template's other providers and native renderer setup:

```ts
import { provideNeuHaptics } from '@neural-ui/native/haptics';

// In the existing mount options:
providers: [provideNeuHaptics({
  enabled: true,
  pressStyle: 'light',
  minimumIntervalMs: 80,
})]
```

Inject `NeuHaptics` from the optional entry or from `@neural-ui/native/foundation`. Its public members are `enabled`, `available` and `play()`. `enabled` is a writable signal and supports runtime opt-out without recreating controls. `available` detects the linked native module, not the presence or state of a vibration motor. `play()` returns whether a request was dispatched; it does not confirm physical vibration.

Button and internal pressable actions use the configured press style. Checkbox, Switch, Radio and Slider request a selection tick for user value changes. Disabled/readonly controls, programmatic model changes, an already-selected radio and a slider already at its bound do not request an extra selection tick. The global interval coalesces rapid calls.

Button, IconButton, Checkbox, Switch, Radio and Slider expose `haptic`. Use `[haptic]="false"` to silence a control, `press` to inherit the configured press style, or `selection`, `light`, `medium`, `heavy`, `soft`, `rigid`, `success`, `warning` or `error`. Do not invent this input for other component APIs merely because their internal actions can use the shared service.

Explicit operation feedback belongs to the application. Call `play('success')` only after a real operation succeeds. Silence a button's ordinary press feedback when its handler explicitly requests a notification pulse, avoiding two requests for one tap. Haptics complement visible feedback and accessible state.

The [preference example](../examples/haptics.ts) runs safely without the adapter; it reports an unavailable request instead of pretending the web preview vibrated. Native applications opt in through the provider above. The browser test checks fallback behavior, not physical output. Emulators/simulators can verify calls into a real native module; physical sensation needs hardware.

Public contracts: [haptics](api/haptics.md), [foundation](api/foundation.md).
Published guide: https://native.neuralui.org/en/haptics
