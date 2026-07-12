import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckItem } from '../../../../shared/components/check-item/check-item';
import { SectionEyebrow } from '../../../../shared/components/section-eyebrow/section-eyebrow';

@Component({
  selector: 'app-why-devdiffy-section',
  imports: [CheckItem, SectionEyebrow],
  templateUrl: './why-devdiffy-section.html',
  styleUrl: './why-devdiffy-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyDevdiffySection {
  readonly reasons = [
    'Beautiful UI',
    'Fast',
    'Privacy first',
    'No login required',
    'Works offline',
    'Mobile friendly',
    'Keyboard shortcuts',
    'Copy with one click',
  ];
}
