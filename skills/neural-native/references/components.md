# Components and public contracts

Use the generated [API index](api/index.md); it contains 67 typed entrypoints for the 64 component entries plus the root, theme and foundation. Native barrel exports duplicate many secondary exports; prefer secondary imports for discovery and application code.

Read the specific contract before using a binding. Common differences from Neural Web:

| Concern | Native contract |
| --- | --- |
| Action | `NeuButtonComponent`, `neu-button`, required `label`, output `pressed` |
| Text control | `neu-input`, inherited `value`/`valueChange`, label, hint, required, disabled, readonly and validation inputs |
| Checkbox or Switch | `checked`/`checkedChange`, not a string `value` |
| Modal | Required `title`, `open`/`openChange`, `closed`, platform presentation events |
| Collections | `NeuOption` uses stable `id`, `label`, optional `description` and `disabled` |
| Data View | `items`, `query`, `descending`, `selected` and `refresh`; no Web Table row API |

The API references merge inherited input/output declarations; a binding absent from the derived class's own metadata may still be public. The references do not expose protected methods or Angular `ɵ` metadata. They do not authorize importing an internal physical file such as `@neural-ui/native/dist/foundation/mobile.js`.

Load collection states explicitly: loading, error, empty, populated, selected and disabled. Refresh emits an application request; provide real data loading or clearly explain an in-memory demonstration. Match the surrounding description to what the example actually does.

See [collections example](../examples/collections.ts), [forms](forms.md) and [customization](customization.md).
