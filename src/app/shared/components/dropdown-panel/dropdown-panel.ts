import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dropdown-panel',
  templateUrl: './dropdown-panel.html',
  styleUrl: './dropdown-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPanel {
  readonly open = input(false);
  readonly width = input(280);
}
