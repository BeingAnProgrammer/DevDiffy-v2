import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JsonHistoryItem } from '../../../../core/models/json-history-entry.model';
import { JsonOutputMode } from '../../../../core/models/json-view.model';
import { Icon } from '../../../../shared/components/icon/icon';
import { SegmentedControl, SegmentOption } from '../../../../shared/components/segmented-control/segmented-control';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { JsonHistoryDropdown } from '../json-history-dropdown/json-history-dropdown';

const MODE_OPTIONS: SegmentOption[] = [
  { label: 'Format', value: 'pretty' },
  { label: 'Minify', value: 'minify' },
  { label: 'Tree', value: 'tree' },
];

@Component({
  selector: 'app-json-toolbar',
  imports: [SegmentedControl, ButtonDirective, Icon, JsonHistoryDropdown],
  templateUrl: './json-toolbar.html',
  styleUrl: './json-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonToolbar {
  readonly outputMode = input.required<JsonOutputMode>();
  readonly autoFormat = input.required<boolean>();
  readonly isTreeMode = input.required<boolean>();
  readonly showValidBadge = input(false);
  readonly showInvalidBadge = input(false);
  readonly jsonError = input<string | null>(null);
  readonly jsonCopied = input(false);
  readonly historyOpen = input(false);
  readonly historyItems = input.required<JsonHistoryItem[]>();

  readonly modeChange = output<JsonOutputMode>();
  readonly toggleAuto = output<void>();
  readonly expandAll = output<void>();
  readonly collapseAll = output<void>();
  readonly upload = output<File>();
  readonly toggleHistory = output<void>();
  readonly selectHistory = output<string>();
  readonly copy = output<void>();
  readonly download = output<void>();
  readonly clear = output<void>();
  readonly openFullscreen = output<void>();

  readonly modeOptions = MODE_OPTIONS;

  onModeChange(value: string): void {
    this.modeChange.emit(value as JsonOutputMode);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.upload.emit(file);
    input.value = '';
  }
}
