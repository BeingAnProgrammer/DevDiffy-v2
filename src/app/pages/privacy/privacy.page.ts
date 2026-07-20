import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionEyebrow } from '../../shared/components/section-eyebrow/section-eyebrow';

@Component({
  selector: 'app-privacy-page',
  imports: [RouterLink, SectionEyebrow],
  templateUrl: './privacy.page.html',
  styleUrl: './privacy.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {}
