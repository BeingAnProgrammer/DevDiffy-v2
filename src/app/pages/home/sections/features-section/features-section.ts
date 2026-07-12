import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Badge } from '../../../../shared/components/badge/badge';
import { Card } from '../../../../shared/components/card/card';
import { CheckItem } from '../../../../shared/components/check-item/check-item';
import { Icon, IconName } from '../../../../shared/components/icon/icon';
import { SectionEyebrow } from '../../../../shared/components/section-eyebrow/section-eyebrow';

@Component({
  selector: 'app-features-section',
  imports: [Card, Icon, CheckItem, Badge, SectionEyebrow],
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesSection {
  readonly jsonFeatureChecks = ['Pretty print & minify', 'Syntax highlighting', 'Copy & download', 'Validate + error highlighting'];
  readonly compareFeatureChecks = ['Side-by-side or inline', 'Added / removed / modified', 'Ignore whitespace', 'Line numbers + copy output'];
  readonly fastTags = ['Instant', 'Offline capable', 'No signup', 'Free forever'];

  readonly jsonIcon: IconName = 'json-braces';
  readonly compareIcon: IconName = 'compare-bars';
  readonly boltIcon: IconName = 'bolt';
  readonly shieldIcon: IconName = 'shield';
}
