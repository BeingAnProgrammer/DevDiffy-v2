import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-json-input-panel',
  templateUrl: './json-input-panel.html',
  styleUrl: './json-input-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonInputPanel {
  readonly value = input.required<string>();
  readonly valueChange = output<string>();
  readonly blurred = output<void>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLTextAreaElement).value);
  }
}
