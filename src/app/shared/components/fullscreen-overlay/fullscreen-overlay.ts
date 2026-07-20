import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, HostListener, inject, input, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-fullscreen-overlay',
  templateUrl: './fullscreen-overlay.html',
  styleUrl: './fullscreen-overlay.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenOverlay implements OnDestroy {
  readonly open = input(false);
  readonly closed = output<void>();

  private readonly document = inject(DOCUMENT);

  constructor() {
    // Lock the page scroll behind the overlay so its scrollbar doesn't show through.
    effect(() => {
      this.document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
