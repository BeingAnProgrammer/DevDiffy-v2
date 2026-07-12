import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-fullscreen-overlay',
  templateUrl: './fullscreen-overlay.html',
  styleUrl: './fullscreen-overlay.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenOverlay {
  readonly open = input(false);
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
