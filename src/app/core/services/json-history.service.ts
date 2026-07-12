import { Injectable } from '@angular/core';
import { JsonHistoryEntry } from '../models/json-history-entry.model';

const STORAGE_KEY = 'devdiffy-json-history';
const MAX_ENTRIES = 5;

@Injectable({ providedIn: 'root' })
export class JsonHistoryService {
  load(): JsonHistoryEntry[] {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(stored) ? stored.slice(0, MAX_ENTRIES) : [];
    } catch {
      return [];
    }
  }

  save(history: JsonHistoryEntry[], raw: string): JsonHistoryEntry[] | null {
    if (!raw || !raw.trim()) return null;
    try {
      JSON.parse(raw);
    } catch {
      return null;
    }
    if (history[0]?.raw === raw) return null;
    const entry: JsonHistoryEntry = { raw, ts: Date.now() };
    const next = [entry, ...history.filter((h) => h.raw !== raw)].slice(0, MAX_ENTRIES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable (private mode / quota) — history just won't persist */
    }
    return next;
  }

  formatRelativeTime(ts: number): string {
    const diff = Date.now() - ts;
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    return `${Math.floor(hr / 24)}d ago`;
  }
}
