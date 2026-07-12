import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WorktreeRow } from '../../../../core/models/json-view.model';

@Component({
  selector: 'app-json-worktree-view',
  templateUrl: './json-worktree-view.html',
  styleUrl: './json-worktree-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonWorktreeView {
  readonly rows = input.required<WorktreeRow[]>();
}
