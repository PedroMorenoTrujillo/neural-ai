---
name: neural-native
description: Build or debug native iOS and Android Angular interfaces with @neural-ui/native, using verified component contracts, Angular signals, themes and native layouts. Use for Neural Native apps and their @ng-native/web previews; not Neural UI Web APIs.
license: MIT
metadata:
  author: PedroMorenoTrujillo
  version: "0.1.0"
  neural-native-version: "0.1.0-beta.2"
  angular-native-version: "0.18.2"
  angular-version: "22.2.2"
---

# Neural Native

Build against the installed npm package, not a similarly named Web control. Read package.json and the lockfile before selecting APIs. This skill's reviewed baseline is **@neural-ui/native 0.1.0-beta.2 with Angular Native 0.18.2**. If the app differs, check its installed public declarations and describe the compatibility gap before changing dependencies.

## Essential decisions

- Import controls from their public `@neural-ui/native/<component>` entrypoints. The [API index](references/api/index.md) lists exact exports, required inputs, models and outputs, including inherited control bindings.
- Use native primitives from `@ng-native/components`: `view`, `text`, `scroll-view` and safe-area components. A Web `<button neu-button>` is not Native's `<neu-button label="Save" (pressed)="save()" />`.
- Preserve the generated Angular Native app entry point, Metro/runtime configuration and compatible Expo host. `@ng-native/web` renders a browser preview; it does not turn an ordinary Web bootstrap into an iOS/Android app.
- Keep editable state in writable signals. Use the real model (`value`, `checked`, `open`, or a component-specific model) and its event; do not invent Web callbacks, services or inputs.
- Put a `neu-theme` around the screen. Use typed `Partial<NeuTokens>` overrides and native-compatible styles. Theme variables and Web v2's CSS token catalogue are different APIs.
- An API example is not complete until its required input labels, useful feedback, safe areas, keyboard behavior and translations fit the app. Keep app persistence and navigation decisions explicit.

## Read only what the task needs

| Task | Reference | Executable example |
| --- | --- | --- |
| Start an app or align dependencies | [Installation](references/installation.md) | [Profile form](examples/forms.ts) |
| Inputs, validation or selection | [Forms and state](references/forms.md) | [Profile form](examples/forms.ts) |
| Discover a component or import | [Components](references/components.md), then [API index](references/api/index.md) | [Collections](examples/collections.ts) |
| Modal content, slots or item templates | [Customization](references/customization.md) | [Overlay](examples/overlays.ts) |
| Navigation state and screen composition | [Navigation](references/navigation.md) | [Navigation](examples/navigation.ts) |
| Brand, light/dark or tokens | [Theming](references/theming.md), [token contract](references/api/tokens.md) | [Theme](examples/theme.ts) |
| Insets, touch, text scaling or localization | [Layout and accessibility](references/layout-accessibility.md) | Adapt the relevant example |
| Upgrade or use an MCP client | [Versions and MCP](references/versioning.md) | — |

The examples are standalone Angular components. Import them into the existing native app, or replace the template's root class while preserving the expected exported `App` name. They keep data in memory and do not imply a backend.

## Optional MCP

When the expanded Neural MCP is available, pass `library: "native"` on every tool call and pin `version: "0.1.0-beta.2"`. Discover exports with `list_components`, obtain the relevant `get_api` contract, then retrieve only the example/reference needed. The MCP defaults to **Web** when the library is omitted. Never interpret a Web result as a Native contract.

Use `validate_usage` for static feedback, then compile with strict Angular templates and exercise the interaction. Static success does not type-check expressions, execute code, inspect external templates, or prove native accessibility. Browser preview checks do not certify iOS/Android behavior.

Sources: [Neural Native documentation](https://native.neuralui.org/en/installation), [published package](https://www.npmjs.com/package/@neural-ui/native), [Angular Native setup](https://ng-native.com/guide/getting-started). This skill does not authorize publishing, deployment or external messages.
