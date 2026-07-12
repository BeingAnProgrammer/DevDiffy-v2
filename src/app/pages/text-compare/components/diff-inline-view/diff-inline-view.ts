import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InlineDiffRow } from '../../../../core/models/diff.model';

@Component({
  selector: 'app-diff-inline-view',
  templateUrl: './diff-inline-view.html',
  styleUrl: './diff-inline-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffInlineView {
  readonly rows = input.required<InlineDiffRow[]>();
}
