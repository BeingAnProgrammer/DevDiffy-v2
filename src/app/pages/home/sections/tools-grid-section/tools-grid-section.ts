import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../../../shared/components/badge/badge';
import { Card } from '../../../../shared/components/card/card';
import { SectionEyebrow } from '../../../../shared/components/section-eyebrow/section-eyebrow';

interface ComingSoonTool {
  name: string;
  description: string;
}

@Component({
  selector: 'app-tools-grid-section',
  imports: [RouterLink, Card, Badge, SectionEyebrow],
  templateUrl: './tools-grid-section.html',
  styleUrl: './tools-grid-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsGridSection {
  readonly comingSoonTools: ComingSoonTool[] = [
    { name: 'JSON Compare', description: 'Structural diff' },
    { name: 'XML Formatter', description: 'Pretty print · validate' },
    { name: 'YAML Formatter', description: 'Convert · validate' },
    { name: 'Base64 Encoder', description: 'Encode · decode' },
    { name: 'JWT Decoder', description: 'Inspect claims' },
    { name: 'Regex Tester', description: 'Match · replace' },
  ];
}
