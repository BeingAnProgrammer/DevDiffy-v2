import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JsonHistoryEntry, JsonHistoryItem } from '../../core/models/json-history-entry.model';
import { JsonOutputMode } from '../../core/models/json-view.model';
import { ClipboardService } from '../../core/services/clipboard.service';
import { JsonFormatterService } from '../../core/services/json-formatter.service';
import { JsonHistoryService } from '../../core/services/json-history.service';
import { SectionEyebrow } from '../../shared/components/section-eyebrow/section-eyebrow';
import { JsonFullscreenView } from './components/json-fullscreen-view/json-fullscreen-view';
import { JsonInputPanel } from './components/json-input-panel/json-input-panel';
import { JsonOutputPanel } from './components/json-output-panel/json-output-panel';
import { JsonToolbar } from './components/json-toolbar/json-toolbar';

const DEFAULT_JSON =
  '{"profile":{"name":"Nitesh Kumar","role":"Full Stack Software Developer","location":"India","email":"nitesh20rv@gmail.com","website":"https://portfolio.rvnk.in/","socials":{"github":"https://github.com/BeingAnProgrammer","linkedin":"https://www.linkedin.com/in/rvnitesh/","medium":"https://medium.com/@rvnitesh"}}}';
const JSON_INDENT = 4;

@Component({
  selector: 'app-json-formatter-page',
  imports: [RouterLink, SectionEyebrow, JsonToolbar, JsonInputPanel, JsonOutputPanel, JsonFullscreenView],
  templateUrl: './json-formatter.page.html',
  styleUrl: './json-formatter.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormatterPage implements OnInit {
  private readonly jsonFormatter = inject(JsonFormatterService);
  private readonly historyService = inject(JsonHistoryService);
  private readonly clipboard = inject(ClipboardService);

  readonly jsonRaw = signal(DEFAULT_JSON);
  readonly outputMode = signal<JsonOutputMode>('pretty');
  readonly autoFormat = signal(true);
  readonly manualSnapshot = signal<string | null>(null);
  readonly collapsedPaths = signal<Record<string, boolean>>({});
  readonly jsonCopied = signal(false);
  readonly jsonFullscreen = signal(false);
  readonly historyOpen = signal(false);
  readonly history = signal<JsonHistoryEntry[]>([]);

  readonly isTreeMode = computed(() => this.outputMode() === 'pretty');
  readonly isFlatMode = computed(() => this.outputMode() === 'minify');
  readonly isWorktreeMode = computed(() => this.outputMode() === 'tree');

  private readonly activeSource = computed(() => {
    if (this.autoFormat()) return this.jsonRaw();
    const snapshot = this.manualSnapshot();
    return snapshot === null ? '' : snapshot;
  });

  private readonly activeEmpty = computed(() => this.activeSource().trim() === '');

  readonly showManualPrompt = computed(
    () => !this.autoFormat() && this.jsonRaw().trim() !== '' && this.manualSnapshot() === null
  );

  private readonly parsed = computed(() => {
    if (this.activeEmpty()) return { value: null as unknown, error: null as string | null };
    return this.jsonFormatter.parse(this.activeSource());
  });

  readonly jsonError = computed(() => this.parsed().error);
  readonly showValidBadge = computed(() => !this.showManualPrompt() && !this.activeEmpty() && !this.jsonError());
  readonly showInvalidBadge = computed(() => !this.showManualPrompt() && !this.activeEmpty() && !!this.jsonError());

  readonly flatRows = computed(() => {
    if (!this.showValidBadge()) return [];
    const outStr =
      this.outputMode() === 'minify'
        ? this.jsonFormatter.minify(this.parsed().value)
        : this.jsonFormatter.prettyPrint(this.parsed().value, JSON_INDENT);
    return this.jsonFormatter.tokenizeLines(outStr);
  });

  readonly treeRows = computed(() => {
    if (!this.showValidBadge() || !this.isTreeMode()) return [];
    return this.jsonFormatter.buildJsonTreeRows(this.parsed().value, this.collapsedPaths());
  });

  readonly worktreeRows = computed(() => {
    if (!this.showValidBadge() || !this.isWorktreeMode()) return [];
    return this.jsonFormatter.buildWorktreeRows(this.parsed().value);
  });

  readonly historyItems = computed<JsonHistoryItem[]>(() =>
    this.history().map((h, i) => ({
      key: `h${i}`,
      preview: h.raw.replace(/\s+/g, ' ').trim().slice(0, 46) + (h.raw.length > 46 ? '…' : ''),
      time: this.historyService.formatRelativeTime(h.ts),
      raw: h.raw,
    }))
  );

  private readonly outputString = computed(() => {
    if (this.activeEmpty()) return '';
    const { value, error } = this.parsed();
    if (error) return '';
    if (this.outputMode() === 'minify') return this.jsonFormatter.minify(value);
    if (this.outputMode() === 'tree') return this.jsonFormatter.buildWorktreeRows(value).map((r) => r.text).join('\n');
    return this.jsonFormatter.prettyPrint(value, JSON_INDENT);
  });

  ngOnInit(): void {
    this.history.set(this.historyService.load());
  }

  onJsonChange(value: string): void {
    this.jsonRaw.set(value);
    this.jsonCopied.set(false);
    this.manualSnapshot.set(null);
  }

  onJsonBlur(): void {
    this.saveToHistory(this.jsonRaw());
  }

  onToggleAutoFormat(): void {
    this.autoFormat.update((v) => !v);
    this.manualSnapshot.set(null);
  }

  onManualFormat(): void {
    this.saveToHistory(this.jsonRaw());
    this.manualSnapshot.set(this.jsonRaw());
  }

  onModeChange(mode: JsonOutputMode): void {
    this.outputMode.set(mode);
  }

  onClearJson(): void {
    this.jsonRaw.set('');
    this.manualSnapshot.set(null);
  }

  onExpandAll(): void {
    this.collapsedPaths.set({});
  }

  onCollapseAll(): void {
    if (this.jsonError()) return;
    const paths: string[] = [];
    this.jsonFormatter.collectExpandablePaths(this.parsed().value, '$', paths);
    const next: Record<string, boolean> = {};
    paths.forEach((p) => (next[p] = true));
    this.collapsedPaths.set(next);
  }

  onTogglePath(path: string): void {
    this.collapsedPaths.update((current) => {
      const next = { ...current };
      if (next[path]) delete next[path];
      else next[path] = true;
      return next;
    });
  }

  onUploadJson(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      this.jsonRaw.set(text);
      this.manualSnapshot.set(null);
      this.saveToHistory(text);
    };
    reader.readAsText(file);
  }

  onCopyJson(): void {
    this.clipboard.copyWithFeedback(this.outputString(), this.jsonCopied);
  }

  onDownloadJson(): void {
    const out = this.outputString();
    if (!out) return;
    this.clipboard.download(out, 'formatted.json');
  }

  toggleHistory(): void {
    this.historyOpen.update((v) => !v);
  }

  onSelectHistory(raw: string): void {
    this.jsonRaw.set(raw);
    this.manualSnapshot.set(null);
    this.historyOpen.set(false);
  }

  onOpenFullscreen(): void {
    this.jsonFullscreen.set(true);
  }

  onCloseFullscreen(): void {
    this.jsonFullscreen.set(false);
  }

  private saveToHistory(raw: string): void {
    const next = this.historyService.save(this.history(), raw);
    if (next) this.history.set(next);
  }
}
