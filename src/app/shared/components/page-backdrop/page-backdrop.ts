import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-backdrop',
  templateUrl: './page-backdrop.html',
  styleUrl: './page-backdrop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBackdrop {}
