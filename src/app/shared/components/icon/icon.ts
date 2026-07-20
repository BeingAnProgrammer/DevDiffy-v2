import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'search'
  | 'arrow-right'
  | 'check'
  | 'history'
  | 'fullscreen'
  | 'minimize'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'medium'
  | 'json-braces'
  | 'compare-bars'
  | 'bolt'
  | 'shield';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(16);
  readonly color = input('currentColor');
  readonly strokeWidth = input(2);
}
