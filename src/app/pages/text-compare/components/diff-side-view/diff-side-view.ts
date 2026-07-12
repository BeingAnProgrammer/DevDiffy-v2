import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SideDiffRow } from '../../../../core/models/diff.model';

@Component({
  selector: 'app-diff-side-view',
  templateUrl: './diff-side-view.html',
  styleUrl: './diff-side-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffSideView {
  readonly rows = input.required<SideDiffRow[]>();
}
