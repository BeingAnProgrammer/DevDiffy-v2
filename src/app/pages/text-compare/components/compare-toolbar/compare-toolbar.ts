import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CompareView } from '../../../../core/models/diff.model';
import { SegmentedControl, SegmentOption } from '../../../../shared/components/segmented-control/segmented-control';
import { ButtonDirective } from '../../../../shared/directives/button.directive';

const VIEW_OPTIONS: SegmentOption[] = [
  { label: 'Side by side', value: 'side' },
  { label: 'Inline', value: 'inline' },
];

@Component({
  selector: 'app-compare-toolbar',
  imports: [SegmentedControl, ButtonDirective],
  templateUrl: './compare-toolbar.html',
  styleUrl: './compare-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareToolbar {
  readonly view = input.required<CompareView>();
  readonly ignoreWs = input(false);
  readonly addedCount = input(0);
  readonly removedCount = input(0);
  readonly diffCopied = input(false);

  readonly viewChange = output<CompareView>();
  readonly toggleIgnoreWs = output<void>();
  readonly swap = output<void>();
  readonly copy = output<void>();
  readonly clear = output<void>();

  readonly viewOptions = VIEW_OPTIONS;

  onViewChange(value: string): void {
    this.viewChange.emit(value as CompareView);
  }
}
