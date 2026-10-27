import { Component } from '@angular/core';
import { SafeAreaProvider, SafeAreaView, ScrollView } from '@ng-native/components';
import { NeuThemeComponent } from '@neural-ui/native/theme';
import { NativeFormsExample } from '../../skills/neural-native/examples/forms';
import { NativeCollectionsExample } from '../../skills/neural-native/examples/collections';
import { NativeNavigationExample } from '../../skills/neural-native/examples/navigation';
import { NativeOverlaysExample } from '../../skills/neural-native/examples/overlays';
import { NativeThemeExample } from '../../skills/neural-native/examples/theme';

@Component({
  selector: 'native-test-host',
  imports: [SafeAreaProvider, SafeAreaView, ScrollView, NeuThemeComponent,
    NativeFormsExample, NativeCollectionsExample, NativeNavigationExample, NativeOverlaysExample, NativeThemeExample],
  template: `
    <safe-area-provider>
      <neu-theme scheme="light">
        <safe-area-view class="screen">
          <scroll-view class="screen" [contentContainerStyle]="{ flexGrow: 1 }" keyboardShouldPersistTaps="handled">
            @switch (example) {
              @case ('collections') { <native-collection-example /> }
              @case ('navigation') { <native-navigation-example /> }
              @case ('overlays') { <native-overlay-example /> }
              @case ('theme') { <native-theme-example /> }
              @default { <native-profile-example /> }
            }
          </scroll-view>
        </safe-area-view>
      </neu-theme>
    </safe-area-provider>
  `,
  styles: `:host, .screen { flex: 1; }`,
})
export class NativeTestHost {
  readonly example = new URLSearchParams(location.search).get('example') ?? 'forms';
}
