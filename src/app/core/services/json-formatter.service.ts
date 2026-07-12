import { Injectable } from '@angular/core';
import { JsonLineRow, JsonToken, JsonTreeRow, WorktreeRow } from '../models/json-view.model';

const COLOR_KEY = 'var(--accent)';
const COLOR_STRING = 'var(--accent-2)';
const COLOR_NUMBER = 'var(--amber)';
const COLOR_BOOL = 'var(--purple)';
const COLOR_PUNCT = 'var(--text-mute)';
const COLOR_PLAIN = 'var(--text-dim)';

const JSON_LINE_TOKEN_RE =
  /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|(\btrue\b|\bfalse\b|\bnull\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])|(\s+)/g;

/**
 * JSON parsing, syntax-highlighting tokenization, collapsible tree rows, and
 * ASCII "worktree" rows — ported from the DevDiffy reference design's inline
 * script (new-design-chat/project/DevDiffy.dc.html) so the tool's behavior
 * matches exactly.
 */
@Injectable({ providedIn: 'root' })
export class JsonFormatterService {
  parse(source: string): { value: unknown; error: null } | { value: null; error: string } {
    try {
      return { value: JSON.parse(source), error: null };
    } catch (e) {
      return { value: null, error: (e as Error).message };
    }
  }

  minify(value: unknown): string {
    return JSON.stringify(value);
  }

  prettyPrint(value: unknown, indent = 4): string {
    return JSON.stringify(value, null, indent);
  }

  tokenizeLines(text: string): JsonLineRow[] {
    return text.split('\n').map((line, i) => ({ num: i + 1, tokens: this.tokenizeJsonLine(line) }));
  }

  tokenizeJsonLine(line: string): JsonToken[] {
    if (line === '') return [{ text: '', color: COLOR_PLAIN }];
    const tokens: JsonToken[] = [];
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    JSON_LINE_TOKEN_RE.lastIndex = 0;
    while ((m = JSON_LINE_TOKEN_RE.exec(line)) !== null) {
      if (m.index > lastIndex) tokens.push({ text: line.slice(lastIndex, m.index), color: COLOR_PLAIN });
      if (m[1] !== undefined) {
        tokens.push({ text: m[1], color: COLOR_KEY });
        if (m[2]) tokens.push({ text: m[2], color: COLOR_PUNCT });
      } else if (m[3] !== undefined) {
        tokens.push({ text: m[3], color: COLOR_STRING });
      } else if (m[4] !== undefined) {
        tokens.push({ text: m[4], color: COLOR_BOOL });
      } else if (m[5] !== undefined) {
        tokens.push({ text: m[5], color: COLOR_NUMBER });
      } else if (m[6] !== undefined) {
        tokens.push({ text: m[6], color: COLOR_PUNCT });
      } else if (m[7] !== undefined) {
        tokens.push({ text: m[7], color: COLOR_PLAIN });
      }
      lastIndex = JSON_LINE_TOKEN_RE.lastIndex;
    }
    if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex), color: COLOR_PLAIN });
    return tokens;
  }

  collectExpandablePaths(value: unknown, path: string, out: string[]): void {
    if (value !== null && typeof value === 'object') {
      const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value as object);
      if (entries.length > 0) out.push(path);
      for (const [k, v] of entries) {
        const childPath = Array.isArray(value) ? `${path}[${k}]` : `${path}.${k}`;
        this.collectExpandablePaths(v, childPath, out);
      }
    }
  }

  private tokenizeValue(v: unknown): JsonToken {
    if (typeof v === 'string') return { text: JSON.stringify(v), color: COLOR_STRING };
    if (typeof v === 'number') return { text: String(v), color: COLOR_NUMBER };
    if (typeof v === 'boolean' || v === null) return { text: v === null ? 'null' : String(v), color: COLOR_BOOL };
    return { text: String(v), color: COLOR_PLAIN };
  }

  buildJsonTreeRows(value: unknown, collapsedPaths: Record<string, boolean>): JsonTreeRow[] {
    const rows: JsonTreeRow[] = [];
    let lineNo = 0;

    const walk = (
      val: unknown,
      path: string,
      keyName: string,
      hasKey: boolean,
      depth: number,
      comma: string
    ): void => {
      lineNo++;
      if (val !== null && typeof val === 'object') {
        const isArray = Array.isArray(val);
        const entries = isArray
          ? (val as unknown[]).map((v, i) => [i, v] as const)
          : Object.entries(val as object);
        const openCh = isArray ? '[' : '{';
        const closeCh = isArray ? ']' : '}';
        const count = entries.length;
        const expandable = count > 0;
        const collapsed = expandable && !!collapsedPaths[path];
        rows.push({
          key: path,
          num: lineNo,
          indent: depth * 18,
          arrow: expandable ? (collapsed ? '▶' : '▼') : '',
          arrowVisible: expandable,
          hasKey,
          keyName,
          bracketOpen: openCh,
          showCollapsedTail: collapsed,
          collapsedLabel: isArray ? `… ${count} items` : `… ${count} keys`,
          bracketClose: collapsed ? closeCh : '',
          showValue: false,
          valueText: '',
          valueColor: COLOR_PLAIN,
          comma: collapsed ? comma : '',
        });
        if (!collapsed) {
          entries.forEach(([k, v], i) => {
            const childIsLast = i === entries.length - 1;
            const childPath = isArray ? `${path}[${k}]` : `${path}.${k}`;
            walk(v, childPath, isArray ? '' : String(k), !isArray, depth + 1, childIsLast ? '' : ',');
          });
          lineNo++;
          rows.push({
            key: `${path}·close`,
            num: lineNo,
            indent: depth * 18,
            arrow: '',
            arrowVisible: false,
            hasKey: false,
            keyName: '',
            bracketOpen: '',
            showCollapsedTail: false,
            collapsedLabel: '',
            bracketClose: closeCh,
            showValue: false,
            valueText: '',
            valueColor: COLOR_PLAIN,
            comma,
          });
        }
      } else {
        const tok = this.tokenizeValue(val);
        rows.push({
          key: path,
          num: lineNo,
          indent: depth * 18,
          arrow: '',
          arrowVisible: false,
          hasKey,
          keyName,
          bracketOpen: '',
          showCollapsedTail: false,
          collapsedLabel: '',
          bracketClose: '',
          showValue: true,
          valueText: tok.text,
          valueColor: tok.color,
          comma,
        });
      }
    };

    walk(value, '$', '', false, 0, '');
    return rows;
  }

  buildWorktreeRows(value: unknown): WorktreeRow[] {
    const rows: WorktreeRow[] = [];
    let counter = 0;

    const nodeChildren = (val: unknown): [string, unknown][] | null => {
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) return Object.entries(val as object);
      return null;
    };

    const walk = (key: string, val: unknown, prefix: string, isLast: boolean, depth: number): void => {
      counter++;
      const connector = depth === 0 ? '' : isLast ? '└── ' : '├── ';
      rows.push({ key: `wt${counter}`, text: prefix + connector + key });
      const children = nodeChildren(val);
      if (children && children.length) {
        const childPrefix = depth === 0 ? '' : prefix + (isLast ? '    ' : '│   ');
        children.forEach(([k, v], i) => walk(k, v, childPrefix, i === children.length - 1, depth + 1));
      }
    };

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const entries = Object.entries(value as object);
      if (entries.length === 1) {
        walk(entries[0][0], entries[0][1], '', true, 0);
      } else {
        entries.forEach(([k, v], i) => walk(k, v, '', i === entries.length - 1, 0));
      }
    } else {
      walk('root', value, '', true, 0);
    }
    return rows;
  }
}
