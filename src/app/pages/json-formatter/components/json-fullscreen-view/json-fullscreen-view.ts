import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JsonLineRow, JsonOutputMode, JsonTreeRow, WorktreeRow } from '../../../../core/models/json-view.model';
import { FullscreenOverlay } from '../../../../shared/components/fullscreen-overlay/fullscreen-overlay';
import { Icon } from '../../../../shared/components/icon/icon';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { JsonFlatView } from '../json-flat-view/json-flat-view';
import { JsonTreeView } from '../json-tree-view/json-tree-view';
import { JsonWorktreeView } from '../json-worktree-view/json-worktree-view';

@Component({
  selector: 'app-json-fullscreen-view',
  imports: [FullscreenOverlay, ButtonDirective, Icon, JsonTreeView, JsonFlatView, JsonWorktreeView],
  templateUrl: './json-fullscreen-view.html',
  styleUrl: './json-fullscreen-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFullscreenView {
  readonly open = input(false);
  readonly mode = input.required<JsonOutputMode>();
  readonly showManualPrompt = input(false);
  readonly showInvalidBadge = input(false);
  readonly jsonError = input<string | null>(null);
  readonly treeRows = input<JsonTreeRow[]>([]);
  readonly flatRows = input<JsonLineRow[]>([]);
  readonly worktreeRows = input<WorktreeRow[]>([]);
  readonly jsonCopied = input(false);

  readonly closed = output<void>();
  readonly manualFormat = output<void>();
  readonly togglePath = output<string>();
  readonly expandAll = output<void>();
  readonly collapseAll = output<void>();
  readonly copy = output<void>();
  readonly download = output<void>();
}
