import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JsonLineRow } from '../../../../core/models/json-view.model';

@Component({
  selector: 'app-json-flat-view',
  templateUrl: './json-flat-view.html',
  styleUrl: './json-flat-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFlatView {
  readonly rows = input.required<JsonLineRow[]>();
}
