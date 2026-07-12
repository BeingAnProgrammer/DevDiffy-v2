import { Directive, HostBinding, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'ghost' | 'ghost-danger' | 'toggle';
export type ButtonSize = 'md' | 'sm' | 'xs';

/**
 * Shared pill-button visuals for native <a>/<button> elements, e.g.:
 *   <a appButton="primary" routerLink="/json-formatter">Try JSON Formatter →</a>
 *   <button appButton="ghost" (click)="onClear()">Clear</button>
 * Kept as a directive (not a wrapper component) so routerLink/href/click/type
 * keep working unmodified on the host element.
 */
@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('ghost', { alias: 'appButton' });
  readonly size = input<ButtonSize>('md');
  readonly active = input(false);

  @HostBinding('class.dd-btn') readonly base = true;

  @HostBinding('class.dd-btn--primary') get isPrimary() {
    return this.variant() === 'primary';
  }
  @HostBinding('class.dd-btn--ghost') get isGhost() {
    return this.variant() === 'ghost';
  }
  @HostBinding('class.dd-btn--ghost-danger') get isGhostDanger() {
    return this.variant() === 'ghost-danger';
  }
  @HostBinding('class.dd-btn--toggle') get isToggle() {
    return this.variant() === 'toggle';
  }
  @HostBinding('class.dd-btn--toggle-active') get isToggleActive() {
    return this.variant() === 'toggle' && this.active();
  }

  @HostBinding('class.dd-btn--sm') get isSm() {
    return this.size() === 'sm';
  }
  @HostBinding('class.dd-btn--xs') get isXs() {
    return this.size() === 'xs';
  }
}
