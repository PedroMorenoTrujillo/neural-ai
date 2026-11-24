import { Component, input, output } from '@angular/core';
import {
  NeuSectionListComponent,
  type NeuSectionListSection,
  type NeuSectionListSelection,
} from '@neural-ui/native/section-list';

@Component({
  selector: 'native-activity-list',
  imports: [NeuSectionListComponent],
  template: `
    <neu-section-list [sections]="sections()" [height]="320"
      [refreshEnabled]="true" [refreshing]="refreshing()"
      refreshLabel="Refresh activity" emptyLabel="No activity yet"
      (selected)="selected.emit($event)" (refresh)="refresh.emit()" />
  `,
})
export class NativeActivityList {
  readonly sections = input.required<readonly NeuSectionListSection[]>();
  readonly refreshing = input(false);
  readonly selected = output<NeuSectionListSelection>();
  readonly refresh = output<void>();
}
