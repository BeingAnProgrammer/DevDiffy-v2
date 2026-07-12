import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JsonTreeRow } from '../../../../core/models/json-view.model';

@Component({
  selector: 'app-json-tree-view',
  templateUrl: './json-tree-view.html',
  styleUrl: './json-tree-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonTreeView {
  readonly rows = input.required<JsonTreeRow[]>();
  readonly togglePath = output<string>();
}
