import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-compare-editor-pair',
  templateUrl: './compare-editor-pair.html',
  styleUrl: './compare-editor-pair.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareEditorPair {
  readonly textA = input.required<string>();
  readonly textB = input.required<string>();
  readonly textAChange = output<string>();
  readonly textBChange = output<string>();

  onAInput(event: Event): void {
    this.textAChange.emit((event.target as HTMLTextAreaElement).value);
  }

  onBInput(event: Event): void {
    this.textBChange.emit((event.target as HTMLTextAreaElement).value);
  }
}
