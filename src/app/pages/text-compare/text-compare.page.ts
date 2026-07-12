import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompareView } from '../../core/models/diff.model';
import { ClipboardService } from '../../core/services/clipboard.service';
import { DiffService } from '../../core/services/diff.service';
import { SectionEyebrow } from '../../shared/components/section-eyebrow/section-eyebrow';
import { CompareEditorPair } from './components/compare-editor-pair/compare-editor-pair';
import { CompareToolbar } from './components/compare-toolbar/compare-toolbar';
import { DiffInlineView } from './components/diff-inline-view/diff-inline-view';
import { DiffSideView } from './components/diff-side-view/diff-side-view';

const DEFAULT_A =
  'function getUser(id) {\n  const user = db.find(id);\n  if (!user) {\n    throw new Error("not found");\n  }\n  return user;\n}';
const DEFAULT_B =
  'function getUser(id) {\n  const user = db.findById(id);\n  if (!user) {\n    throw new Error("User not found");\n  }\n  console.log("fetched", id);\n  return user;\n}';

@Component({
  selector: 'app-text-compare-page',
  imports: [RouterLink, SectionEyebrow, CompareToolbar, CompareEditorPair, DiffSideView, DiffInlineView],
  templateUrl: './text-compare.page.html',
  styleUrl: './text-compare.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComparePage {
  private readonly diffService = inject(DiffService);
  private readonly clipboard = inject(ClipboardService);

  readonly textA = signal(DEFAULT_A);
  readonly textB = signal(DEFAULT_B);
  readonly compareView = signal<CompareView>('side');
  readonly ignoreWs = signal(false);
  readonly diffCopied = signal(false);

  private readonly ops = computed(() =>
    this.diffService.computeOps(this.textA().split('\n'), this.textB().split('\n'), this.ignoreWs())
  );

  readonly sideRows = computed(() => this.diffService.buildSideRows(this.ops()));
  readonly inlineRows = computed(() => this.diffService.buildInlineRows(this.ops()));
  readonly addedCount = computed(() => this.ops().filter((o) => o.type === 'insert').length);
  readonly removedCount = computed(() => this.ops().filter((o) => o.type === 'delete').length);

  onTextAChange(value: string): void {
    this.textA.set(value);
  }

  onTextBChange(value: string): void {
    this.textB.set(value);
  }

  onViewChange(view: CompareView): void {
    this.compareView.set(view);
  }

  onToggleIgnoreWs(): void {
    this.ignoreWs.update((v) => !v);
  }

  onSwap(): void {
    const a = this.textA();
    this.textA.set(this.textB());
    this.textB.set(a);
  }

  onClear(): void {
    this.textA.set('');
    this.textB.set('');
  }

  onCopyDiff(): void {
    const text = this.ops()
      .map((o) => (o.type === 'equal' ? `  ${o.a}` : o.type === 'delete' ? `- ${o.a}` : `+ ${o.b}`))
      .join('\n');
    this.clipboard.copyWithFeedback(text, this.diffCopied);
  }
}
