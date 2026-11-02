import { Component, inject, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import { NeuHaptics } from '@neural-ui/native/foundation';
import { NeuSwitchComponent } from '@neural-ui/native/switch';
import { NeuButtonComponent } from '@neural-ui/native/button';

@Component({
  selector: 'native-haptics-example',
  imports: [Text, View, NeuSwitchComponent, NeuButtonComponent],
  template: `
    <view class="content">
      <neu-switch label="Touch feedback"
        [checked]="haptics.enabled()"
        (checkedChange)="haptics.enabled.set($event)"
        [haptic]="false" />
      <neu-button label="Test feedback" [haptic]="false"
        [disabled]="!haptics.enabled()" (pressed)="testFeedback()" />
      <text>{{ feedback() }}</text>
    </view>
  `,
  styles: `.content { padding: 24px; gap: 16px; }`,
})
export class NativeHapticsExample {
  readonly haptics = inject(NeuHaptics);
  readonly feedback = signal('Feedback is optional.');

  testFeedback(): void {
    this.feedback.set(this.haptics.play('success')
      ? 'Native feedback requested.'
      : 'Native feedback is unavailable or disabled.');
  }
}
