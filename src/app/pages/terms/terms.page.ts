import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionEyebrow } from '../../shared/components/section-eyebrow/section-eyebrow';

@Component({
  selector: 'app-terms-page',
  imports: [RouterLink, SectionEyebrow],
  templateUrl: './terms.page.html',
  styleUrl: './terms.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPage {}
