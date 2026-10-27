# Forms and owned state

Use writable signals in the application. An input's `value` model owns text; Checkbox/Switch use `checked`. Single Select uses string `value`; multiple Select uses `values: readonly string[]`. Keep option IDs stable when translating labels.

```html
<neu-input label="Full name" [(value)]="name" [required]="true" />
<neu-select label="Team" [options]="teams" [(value)]="team" />
<neu-checkbox label="Product updates" [(checked)]="updates" />
<neu-button label="Save profile" (pressed)="save()" />
```

Import every component used; see the complete [forms example](../examples/forms.ts). `pressed` requests an action, while the application validates and saves. Do not attach a Web `click` handler to a Native Neural component in place of its declared output.

Angular Signal Forms is optional. If used, import `FormField` from the matching `@angular/forms/signals` release and bind `[formField]` to the actual form tree field. Let that form own the control; do not also bind its `value`/`checked` model or a second form owner. Run strict Angular template checking for the actual field types. Classic CVA assumptions and Web Neural examples are not substitutes for checking the Native control.

Neural's `NeuFormFieldComponent` arranges projected content and messages. It is not Angular's `FormField` directive. Apply the accessible name and requirement to the projected control itself.

Localize exposed hint, error, empty, search and action labels. Check date/number contracts for supported formats instead of storing translated display strings as canonical values.
