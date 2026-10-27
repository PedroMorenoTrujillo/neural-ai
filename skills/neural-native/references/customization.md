# Projection and typed templates

Choose the customization API actually exported by the component; Web's similarly named directives do not apply.

- Card and Panel accept projected content and their exported header/footer marker directives. Use native `view`/`text` inside them.
- Modal and Bottom Sheet project body content and export `NeuModalHeaderDirective`/`NeuModalFooterDirective` or their Bottom Sheet counterparts for `ng-template` slots. Keep title and close semantics accessible.
- Data View exports `NeuDataViewItemDirective` and `NeuDataViewItemContext`; Select exports item/selected directives and contexts. Listbox, Gallery and Virtual List have their own contracts. Read the corresponding [API entry](api/index.md) before choosing context fields.

For Select, the selected-template context contains the selected option array as `$implicit`, plus `value`, `values` and `placeholder`. Its item template uses the Listbox item context. Do not assume an undocumented `row`, `record`, `onSelect` or Web template variable.

The [overlay example](../examples/overlays.ts) uses a real `neuModalFooter` slot and application-owned `open` state. The supplied footer button closes the requested state; native presentation completion is a separate event. `dismissed` is an iOS native completion event and does not mean Android has failed when it is absent.

Avoid placing a second large modal/calendar over a constrained modal body unless the flow and the actual platform presentation support it. Verify overflow and dismissal on the target device, not only in the browser preview.
