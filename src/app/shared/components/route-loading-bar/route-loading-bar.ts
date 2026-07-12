import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

/** Thin top progress bar shown while a lazy-loaded route chunk is being fetched. */
@Component({
  selector: 'app-route-loading-bar',
  templateUrl: './route-loading-bar.html',
  styleUrl: './route-loading-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteLoadingBar {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  constructor() {
    const subscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) this.loading.set(true);
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading.set(false);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
