import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Step {
  index: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works-section',
  templateUrl: './how-it-works-section.html',
  styleUrl: './how-it-works-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksSection {
  readonly steps: Step[] = [
    {
      index: '01',
      title: 'Paste or upload',
      description: 'Drop in raw JSON, or two versions of a file you want to compare.',
    },
    {
      index: '02',
      title: 'Format or diff instantly',
      description: 'Everything runs client-side as you type — no server round-trip.',
    },
    {
      index: '03',
      title: 'Copy or export',
      description: 'Grab the result with one click, or download it straight to disk.',
    },
  ];
}
