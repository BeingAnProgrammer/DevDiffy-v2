import { Injectable, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  /**
   * Copies `text` and flips `copiedSignal` true for `resetMs`, mirroring the
   * "Copied!" label swap used by the JSON/diff copy buttons in the reference design.
   */
  copyWithFeedback(text: string, copiedSignal: WritableSignal<boolean>, resetMs = 1600): void {
    if (!text) return;
    const clipboard = navigator.clipboard?.writeText(text) ?? Promise.reject();
    clipboard
      .then(() => {
        copiedSignal.set(true);
        setTimeout(() => copiedSignal.set(false), resetMs);
      })
      .catch(() => {
        /* clipboard permission denied / unavailable — silently ignore, matches reference */
      });
  }

  download(content: string, filename: string, mimeType = 'application/json'): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
