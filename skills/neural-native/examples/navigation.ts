import { Component, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';
import { NeuCardComponent } from '@neural-ui/native/card';
import { NeuNavComponent, type NeuNavItem } from '@neural-ui/native/nav';

@Component({
  selector: 'native-navigation-example',
  imports: [Text, View, NeuCardComponent, NeuNavComponent],
  template: `
    <view class="screen">
      <view class="body">
        @switch (destination()) {
          @case ('projects') {
            <text class="heading">Room for the next idea.</text>
            <neu-card title="Mobile launch" description="Design review ready">
              <text class="muted">Three screens to review with your team.</text>
            </neu-card>
          }
          @case ('account') {
            <text class="heading">Your workspace profile.</text>
            <neu-card title="Ada Lovelace" description="Product designer">
              <text class="muted">Design team · Notifications enabled</text>
            </neu-card>
          }
          @default {
            <text class="heading">A good day to make something.</text>
            <neu-card title="Today" description="Your team is in sync">
              <text class="muted">Two reviews complete. One new idea to explore.</text>
            </neu-card>
          }
        }
      </view>
      <neu-nav label="Workspace destinations" [items]="destinations" [(value)]="destination" />
    </view>
  `,
  styles: `
    :host, .screen { flex: 1; }
    .body { flex: 1; padding: 20px; gap: 20px; }
    .heading { font-size: 28px; font-weight: 700; color: var(--neu-text); }
    .muted { font-size: 15px; color: var(--neu-muted); }
  `,
})
export class NativeNavigationExample {
  readonly destination = signal('home');
  readonly destinations: readonly NeuNavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'account', label: 'Account' },
  ];
}
