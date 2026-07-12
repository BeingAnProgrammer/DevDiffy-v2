import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionEyebrow } from '../../shared/components/section-eyebrow/section-eyebrow';

interface ShortcutRow {
  label: string;
  keys: string;
}

@Component({
  selector: 'app-docs-page',
  imports: [RouterLink, SectionEyebrow],
  templateUrl: './docs.page.html',
  styleUrl: './docs.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPage {
  readonly shortcuts: ShortcutRow[] = [
    { label: 'Select all in editor', keys: 'Ctrl/Cmd + A' },
    { label: 'Undo last edit', keys: 'Ctrl/Cmd + Z' },
    { label: 'Find in editor', keys: 'Ctrl/Cmd + F' },
  ];
}
