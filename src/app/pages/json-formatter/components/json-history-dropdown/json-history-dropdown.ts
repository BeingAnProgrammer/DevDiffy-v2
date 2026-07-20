import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JsonHistoryItem } from '../../../../core/models/json-history-entry.model';
import { DropdownPanel } from '../../../../shared/components/dropdown-panel/dropdown-panel';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-json-history-dropdown',
  imports: [DropdownPanel, Icon],
  templateUrl: './json-history-dropdown.html',
  styleUrl: './json-history-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonHistoryDropdown {
  readonly items = input.required<JsonHistoryItem[]>();
  readonly open = input(false);
  readonly toggleOpen = output<void>();
  readonly select = output<string>();
}
