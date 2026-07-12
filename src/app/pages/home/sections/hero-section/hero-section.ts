import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JsonLineRow } from '../../../../core/models/json-view.model';
import { JsonFormatterService } from '../../../../core/services/json-formatter.service';
import { Badge } from '../../../../shared/components/badge/badge';
import { Icon } from '../../../../shared/components/icon/icon';
import { ButtonDirective } from '../../../../shared/directives/button.directive';

const HERO_RAW = '{\n"id":7,"name":"devdiffy",\n"ok":true,\n"tags":["fast","free"]}';
const HERO_FORMATTED = '{\n  "id": 7,\n  "name": "devdiffy",\n  "ok": true,\n  "tags": [\n    "fast",\n    "free"\n  ]\n}';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, ButtonDirective, Badge, Icon],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  private readonly jsonFormatter = inject(JsonFormatterService);

  readonly heroRawLines: string[] = HERO_RAW.split('\n');
  readonly heroFormattedRows: JsonLineRow[] = this.jsonFormatter.tokenizeLines(HERO_FORMATTED);

  readonly heroTags = ['Instant', 'Offline capable', 'No signup', 'Free forever'];
}
