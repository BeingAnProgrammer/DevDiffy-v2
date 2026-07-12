import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JsonLineRow, JsonOutputMode, JsonTreeRow, WorktreeRow } from '../../../../core/models/json-view.model';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { JsonFlatView } from '../json-flat-view/json-flat-view';
import { JsonTreeView } from '../json-tree-view/json-tree-view';
import { JsonWorktreeView } from '../json-worktree-view/json-worktree-view';

@Component({
  selector: 'app-json-output-panel',
  imports: [ButtonDirective, JsonTreeView, JsonFlatView, JsonWorktreeView],
  templateUrl: './json-output-panel.html',
  styleUrl: './json-output-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonOutputPanel {
  readonly mode = input.required<JsonOutputMode>();
  readonly showManualPrompt = input(false);
  readonly showInvalidBadge = input(false);
  readonly jsonError = input<string | null>(null);
  readonly treeRows = input<JsonTreeRow[]>([]);
  readonly flatRows = input<JsonLineRow[]>([]);
  readonly worktreeRows = input<WorktreeRow[]>([]);

  readonly manualFormat = output<void>();
  readonly togglePath = output<string>();
}
