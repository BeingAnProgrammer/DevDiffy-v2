import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

export type CheckItemVariant = 'inline' | 'chip';

@Component({
  selector: 'app-check-item',
  imports: [Icon],
  templateUrl: './check-item.html',
  styleUrl: './check-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckItem {
  readonly variant = input<CheckItemVariant>('inline');
}
