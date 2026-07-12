import { Injectable } from '@angular/core';
import { DiffOp, InlineDiffRow, SideDiffRow } from '../models/diff.model';

const COLOR_SUCCESS = 'var(--success)';
const COLOR_DANGER = 'var(--danger)';
const BG_DELETE = 'rgba(255,77,109,0.14)';
const BG_INSERT = 'rgba(52,211,153,0.14)';

/**
 * Line-level LCS diff — ported from the DevDiffy reference design's inline
 * script (new-design-chat/project/DevDiffy.dc.html) so Text Compare behaves
 * identically (same pairing/grouping of consecutive deletes+inserts).
 */
@Injectable({ providedIn: 'root' })
export class DiffService {
  private normalizeLine(line: string, ignoreWs: boolean): string {
    return ignoreWs ? line.trim().replace(/\s+/g, ' ') : line;
  }

  computeOps(linesA: string[], linesB: string[], ignoreWs: boolean): DiffOp[] {
    const n = linesA.length;
    const m = linesB.length;
    const na = linesA.map((l) => this.normalizeLine(l, ignoreWs));
    const nb = linesB.map((l) => this.normalizeLine(l, ignoreWs));
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = na[i] === nb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const ops: DiffOp[] = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (na[i] === nb[j]) {
        ops.push({ type: 'equal', a: linesA[i], b: linesB[j] });
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        ops.push({ type: 'delete', a: linesA[i] });
        i++;
      } else {
        ops.push({ type: 'insert', b: linesB[j] });
        j++;
      }
    }
    while (i < n) {
      ops.push({ type: 'delete', a: linesA[i] });
      i++;
    }
    while (j < m) {
      ops.push({ type: 'insert', b: linesB[j] });
      j++;
    }
    return ops;
  }

  buildSideRows(ops: DiffOp[]): SideDiffRow[] {
    const rows: SideDiffRow[] = [];
    let buffer: DiffOp[] = [];
    let leftNum = 0;
    let rightNum = 0;

    const flush = () => {
      if (!buffer.length) return;
      const deletes = buffer.filter((o) => o.type === 'delete');
      const inserts = buffer.filter((o) => o.type === 'insert');
      const pairs = Math.min(deletes.length, inserts.length);
      for (let k = 0; k < pairs; k++) {
        leftNum++;
        rightNum++;
        rows.push({
          key: rows.length,
          leftNum,
          leftText: deletes[k].a!,
          leftBg: BG_DELETE,
          leftColor: COLOR_DANGER,
          rightNum,
          rightText: inserts[k].b!,
          rightBg: BG_INSERT,
          rightColor: COLOR_SUCCESS,
        });
      }
      for (let k = pairs; k < deletes.length; k++) {
        leftNum++;
        rows.push({
          key: rows.length,
          leftNum,
          leftText: deletes[k].a!,
          leftBg: BG_DELETE,
          leftColor: COLOR_DANGER,
          rightNum: '',
          rightText: '',
          rightBg: 'transparent',
          rightColor: 'var(--text-mute)',
        });
      }
      for (let k = pairs; k < inserts.length; k++) {
        rightNum++;
        rows.push({
          key: rows.length,
          leftNum: '',
          leftText: '',
          leftBg: 'transparent',
          leftColor: 'var(--text-mute)',
          rightNum,
          rightText: inserts[k].b!,
          rightBg: BG_INSERT,
          rightColor: COLOR_SUCCESS,
        });
      }
      buffer = [];
    };

    for (const op of ops) {
      if (op.type === 'equal') {
        flush();
        leftNum++;
        rightNum++;
        rows.push({
          key: rows.length,
          leftNum,
          leftText: op.a!,
          leftBg: 'transparent',
          leftColor: 'var(--text-dim)',
          rightNum,
          rightText: op.b!,
          rightBg: 'transparent',
          rightColor: 'var(--text-dim)',
        });
      } else {
        buffer.push(op);
      }
    }
    flush();
    return rows;
  }

  buildInlineRows(ops: DiffOp[]): InlineDiffRow[] {
    const rows: InlineDiffRow[] = [];
    let leftNum = 0;
    let rightNum = 0;
    for (const op of ops) {
      if (op.type === 'equal') {
        leftNum++;
        rightNum++;
        rows.push({ key: rows.length, sign: ' ', text: op.a!, bg: 'transparent', color: 'var(--text-dim)', num: leftNum });
      } else if (op.type === 'delete') {
        leftNum++;
        rows.push({ key: rows.length, sign: '−', text: op.a!, bg: BG_DELETE, color: COLOR_DANGER, num: leftNum });
      } else {
        rightNum++;
        rows.push({ key: rows.length, sign: '+', text: op.b!, bg: BG_INSERT, color: COLOR_SUCCESS, num: rightNum });
      }
    }
    return rows;
  }
}
