import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'tag' | 'soon' | 'live';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  readonly variant = input<BadgeVariant>('tag');
  readonly dotColor = input('#34d399');
}
