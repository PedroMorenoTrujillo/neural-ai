import { Component, computed, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import type { NeuTokens } from '@neural-ui/native/foundation';
import { NeuThemeComponent } from '@neural-ui/native/theme';
import { NeuSwitchComponent } from '@neural-ui/native/switch';
import { NeuCardComponent } from '@neural-ui/native/card';
import { NeuButtonComponent } from '@neural-ui/native/button';

@Component({
  selector: 'native-theme-example',
  imports: [Text, View, NeuThemeComponent, NeuSwitchComponent, NeuCardComponent, NeuButtonComponent],
  template: `
    <neu-theme [scheme]="dark() ? 'dark' : 'light'" [tokens]="brand()">
      <view class="content">
        <text class="heading">A little more you.</text>
        <neu-switch label="Dark appearance" [(checked)]="dark" />
        <neu-card title="Neural, with your palette" description="Shared tokens, real controls">
          <view class="card-content">
            <text class="muted">Readable surfaces and controls in both appearances.</text>
            <neu-button label="Try the brand color" (pressed)="feedback.set('Brand action pressed.')" />
          </view>
        </neu-card>
        <text class="muted">{{ feedback() }}</text>
      </view>
    </neu-theme>
  `,
  styles: `
    .content { padding: 20px; gap: 16px; background-color: var(--neu-canvas); }
    .card-content { gap: 16px; }
    .heading { font-size: 28px; font-weight: 700; color: var(--neu-text); }
    .muted { font-size: 14px; color: var(--neu-muted); }
  `,
})
export class NativeThemeExample {
  readonly dark = signal(false);
  readonly feedback = signal('Switch appearance to compare the palette.');
  readonly brand = computed(() => ({
    accent: this.dark() ? '#b9b1ff' : '#5941c6',
    onAccent: this.dark() ? '#23164b' : '#ffffff',
    radius: 16,
  } satisfies Partial<NeuTokens>));
}
