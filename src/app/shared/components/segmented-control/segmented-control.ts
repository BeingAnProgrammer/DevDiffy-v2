import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective } from '../../directives/button.directive';

export interface SegmentOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-segmented-control',
  imports: [ButtonDirective],
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControl {
  readonly options = input.required<SegmentOption[]>();
  readonly value = input.required<string>();
  readonly ariaLabel = input('Choose view');
  readonly valueChange = output<string>();

  select(value: string): void {
    this.valueChange.emit(value);
  }
}
