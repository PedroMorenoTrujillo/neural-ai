import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { NeuButtonComponent } from '@neural-ui/core/button';
import { NeuInputComponent } from '@neural-ui/core/input';
import { NeuSelectComponent } from '@neural-ui/core/select';
import { NeuDialogComponent } from '@neural-ui/core/modal';
import { NeuTabsComponent, NeuTabPanelComponent, type NeuTab } from '@neural-ui/core/tabs';
import { NeuTableComponent, type NeuTableColumn, type NeuTableQuery, type NeuTableSelection, type NeuTableSelectionOptions } from '@neural-ui/core/table';

interface Customer { id: number; name: string; region: string; }
type Field = 'name' | 'region';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NeuButtonComponent, NeuInputComponent, NeuSelectComponent, NeuDialogComponent, NeuTabsComponent, NeuTabPanelComponent, NeuTableComponent],
  template: `
    <main>
      <h1>Neural AI clean consumer</h1>
      <button neu-button type="button" (neuClick)="toggleTheme()">Toggle theme</button>
      <output data-testid="theme">{{ dark() ? 'dark' : 'light' }}</output>
      <neu-tabs [tabs]="tabs" [activeId]="activeTab()" (activeIdChange)="activeTab.set($event)" ariaLabel="Workspace">
        <neu-tab-panel tabId="customers">
          <h2>Customers</h2>
          <form (submit)="addCustomer($event)">
            <neu-input label="Customer name" inputId="customer-name" [formField]="fields.name"
              [errorMessage]="fields.name().touched() && fields.name().invalid() ? 'At least 3 characters required' : ''" />
            <neu-select label="Region" mode="single" [options]="regions" [optionLabel]="regionLabel"
              [optionValue]="regionValue" [value]="region()" (valueChange)="region.set($event)" />
            <button neu-button type="submit" [disabled]="fields().invalid() || region() === null">Add customer</button>
          </form>
          <output data-testid="customer-count">{{ customers().length }}</output>
          <output data-testid="form-state">{{ fields.name().touched() }} / {{ fields.name().dirty() }}</output>
          <neu-table [data]="customers()" [columns]="columns" [rowKey]="rowKey"
            [query]="query()" (queryChange)="query.set($event)"
            [selection]="selection()" (selectionChange)="selection.set($event.next)" [selectionOptions]="selectionOptions" />
          <output data-testid="selected">{{ selected()?.name ?? 'none' }}</output>
          <button neu-button type="button" [disabled]="!selected()" (neuClick)="editCustomer()">Edit selected</button>
        </neu-tab-panel>
        <neu-tab-panel tabId="settings"><h2>Workspace settings</h2><p>The application owns state.</p></neu-tab-panel>
      </neu-tabs>
      <neu-dialog [open]="editorOpen()" title="Edit selected customer" (closeRequested)="requestClose()">
        <neu-input label="Edited name" [value]="draft()" (valueChange)="draft.set($event)" />
        <label><input type="checkbox" [checked]="protectDraft()" (change)="protectDraft.set(!protectDraft())" /> Protect unsaved draft</label>
        <button neu-button type="button" (neuClick)="saveCustomer()">Save changes</button>
        <button neu-button type="button" (neuClick)="editorOpen.set(false)">Discard changes</button>
      </neu-dialog>
      <output data-testid="close-requests">{{ closeRequests() }}</output>
    </main>
  `,
})
export class App {
  private readonly document = inject(DOCUMENT);
  private nextId = 3;
  readonly dark = signal(false);
  readonly model = signal({ name: '' });
  readonly fields = form(this.model, schema => { required(schema.name); minLength(schema.name, 3); });
  readonly regions = [{ id: 'eu', label: 'Europe' }, { id: 'am', label: 'Americas' }];
  readonly regionLabel = (value: (typeof this.regions)[number]) => value.label;
  readonly regionValue = (value: (typeof this.regions)[number]) => value.id;
  readonly region = signal<string | null>('eu');
  readonly customers = signal<readonly Customer[]>([{ id: 1, name: 'Zoe', region: 'eu' }, { id: 2, name: 'Ana', region: 'am' }]);
  readonly rowKey = (row: Customer) => row.id;
  readonly columns: readonly NeuTableColumn<Customer, Field>[] = [
    { id: 'name', header: 'Name', field: 'name', sort: { field: 'name' } },
    { id: 'region', header: 'Region', field: 'region' },
  ];
  readonly query = signal<NeuTableQuery<Field>>({ page: 0, pageSize: 10, search: '', sort: [], filters: null });
  readonly selection = signal<NeuTableSelection<number, Field>>({ kind: 'keys', keys: [] });
  readonly selectionOptions: NeuTableSelectionOptions<Customer> = { mode: 'single', indicator: 'radio', selectOnRowClick: true, allowClear: true };
  readonly selected = computed(() => {
    const selected = this.selection();
    return selected.kind === 'keys' ? this.customers().find(row => row.id === selected.keys[0]) : undefined;
  });
  readonly tabs: readonly NeuTab[] = [{ id: 'customers', label: 'Customers' }, { id: 'settings', label: 'Settings' }];
  readonly activeTab = signal<string | null>('customers');
  readonly editorOpen = signal(false);
  readonly draft = signal('');
  readonly protectDraft = signal(true);
  readonly closeRequests = signal(0);

  addCustomer(event: Event): void {
    event.preventDefault();
    const region = this.region();
    if (this.fields().invalid() || region === null) return;
    this.customers.update(rows => [...rows, { id: this.nextId++, name: this.model().name, region }]);
    this.fields.name().reset('');
  }
  editCustomer(): void {
    const customer = this.selected();
    if (!customer) return;
    this.draft.set(customer.name);
    this.editorOpen.set(true);
  }
  requestClose(): void {
    this.closeRequests.update(count => count + 1);
    if (!this.protectDraft() || this.draft() === this.selected()?.name) this.editorOpen.set(false);
  }
  saveCustomer(): void {
    const id = this.selected()?.id;
    if (id === undefined || this.draft().trim().length < 3) return;
    this.customers.update(rows => rows.map(row => row.id === id ? { ...row, name: this.draft().trim() } : row));
    this.editorOpen.set(false);
  }
  toggleTheme(): void {
    this.dark.update(value => !value);
    this.document.documentElement.setAttribute('data-theme', this.dark() ? 'dark' : 'light');
  }
}
