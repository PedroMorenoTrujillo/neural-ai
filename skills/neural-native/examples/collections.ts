import { Component, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import type { NeuOption } from '@neural-ui/native';
import { NeuDataViewComponent } from '@neural-ui/native/data-view';

@Component({
  selector: 'native-collection-example',
  imports: [Text, View, NeuDataViewComponent],
  template: `
    <view class="content">
      <text class="heading">The people behind it.</text>
      <text class="muted">Find a teammate, change the order or refresh this local list.</text>
      <neu-data-view [items]="people" [(query)]="query" [(descending)]="descending"
        searchLabel="Search people" sortLabel="Reverse name order" refreshLabel="Refresh local list"
        emptyLabel="No people match your search" (selected)="select($event)" (refresh)="refresh()" />
      <text class="muted">{{ feedback() }}</text>
    </view>
  `,
  styles: `
    .content { padding: 20px; gap: 16px; }
    .heading { font-size: 26px; font-weight: 700; color: var(--neu-text); }
    .muted { font-size: 14px; color: var(--neu-muted); }
  `,
})
export class NativeCollectionsExample {
  readonly query = signal('');
  readonly descending = signal(false);
  readonly feedback = signal('Choose a person to see their name.');
  readonly people: readonly NeuOption[] = [
    { id: 'ada', label: 'Ada Lovelace', description: 'Product designer' },
    { id: 'grace', label: 'Grace Hopper', description: 'Mobile engineer' },
    { id: 'linus', label: 'Linus Torvalds', description: 'Platform engineer' },
  ];
  select(id: string): void {
    this.feedback.set(`Selected: ${this.people.find(person => person.id === id)?.label ?? id}`);
  }
  refresh(): void {
    this.query.set('');
    this.feedback.set('Local list refreshed. No server request was made.');
  }
}
