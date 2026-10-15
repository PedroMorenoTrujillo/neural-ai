import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsExample } from '../../../../skills/neural-ui/examples/forms';
import { TableExample } from '../../../../skills/neural-ui/examples/table';
import { NavigationExample } from '../../../../skills/neural-ui/examples/navigation';
import { OverlaysExample } from '../../../../skills/neural-ui/examples/overlays';
import { ThemeExample } from '../../../../skills/neural-ui/examples/theme';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsExample, TableExample, NavigationExample, OverlaysExample, ThemeExample],
  selector: 'app-root',
  template: `<main><h1>Neural AI integration</h1><example-theme /><example-forms /><example-table /><example-navigation /><example-overlays /></main>`,
})
export class App {}
