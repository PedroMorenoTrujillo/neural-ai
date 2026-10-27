import { Component, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import { NeuButtonComponent } from '@neural-ui/native/button';
import { NeuModalComponent, NeuModalFooterDirective } from '@neural-ui/native/modal';

@Component({
  selector: 'native-overlay-example',
  imports: [Text, View, NeuButtonComponent, NeuModalComponent, NeuModalFooterDirective],
  template: `
    <view class="content">
      <text class="heading">One place for your team.</text>
      <text class="muted">A short explanation, with an explicit way back.</text>
      <neu-button label="About this workspace" (pressed)="open.set(true)" />
      <text class="muted">{{ feedback() }}</text>
      <neu-modal title="Product workspace" [(open)]="open" closeLabel="Close workspace details"
        (closed)="feedback.set('Workspace details closed.')">
        <text class="message">A shared place for your team's plans and documents.</text>
        <ng-template neuModalFooter>
          <neu-button label="Got it" size="sm" (pressed)="open.set(false)" />
        </ng-template>
      </neu-modal>
    </view>
  `,
  styles: `
    .content { padding: 20px; gap: 16px; }
    .heading { font-size: 26px; font-weight: 700; color: var(--neu-text); }
    .message { font-size: 16px; color: var(--neu-text); }
    .muted { font-size: 14px; color: var(--neu-muted); }
  `,
})
export class NativeOverlaysExample {
  readonly open = signal(false);
  readonly feedback = signal('Details are closed.');
}
