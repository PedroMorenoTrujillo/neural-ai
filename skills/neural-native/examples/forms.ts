import { Component, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import type { NeuOption } from '@neural-ui/native';
import { NeuButtonComponent } from '@neural-ui/native/button';
import { NeuCheckboxComponent } from '@neural-ui/native/checkbox';
import { NeuInputComponent } from '@neural-ui/native/input';
import { NeuSelectComponent } from '@neural-ui/native/select';

@Component({
  selector: 'native-profile-example',
  imports: [Text, View, NeuButtonComponent, NeuCheckboxComponent, NeuInputComponent, NeuSelectComponent],
  template: `
    <view class="content">
      <text class="eyebrow">YOUR WORKSPACE</text>
      <text class="heading">Make it yours.</text>
      <text class="muted">A name and a team to help everyone find you.</text>
      <neu-input label="Full name" [(value)]="name" [required]="true" hint="Visible to your teammates" />
      <neu-select label="Team" [options]="teams" [(value)]="team" closeLabel="Close teams" />
      <neu-checkbox label="Send me product updates" [(checked)]="updates" />
      <neu-button label="Save profile" [fullWidth]="true" (pressed)="save()" />
      <text class="muted">{{ feedback() }}</text>
    </view>
  `,
  styles: `
    .content { padding: 20px; gap: 16px; }
    .eyebrow { font-size: 12px; color: var(--neu-muted); }
    .heading { font-size: 28px; font-weight: 700; color: var(--neu-text); }
    .muted { font-size: 14px; color: var(--neu-muted); }
  `,
})
export class NativeFormsExample {
  readonly name = signal('Ada Lovelace');
  readonly team = signal('design');
  readonly updates = signal(false);
  readonly feedback = signal('Changes stay in this example.');
  readonly teams: readonly NeuOption[] = [
    { id: 'design', label: 'Design', description: 'Product interfaces' },
    { id: 'engineering', label: 'Engineering', description: 'Application development' },
  ];
  save(): void {
    this.feedback.set(this.name().trim() ? `Saved locally: ${this.name().trim()}` : 'Enter your name.');
  }
}
