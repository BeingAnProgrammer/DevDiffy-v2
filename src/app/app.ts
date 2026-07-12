import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SeoConfig } from './core/models/seo-config.model';
import { SeoService } from './core/services/seo.service';
import { Footer } from './shared/components/footer/footer';
import { Navbar } from './shared/components/navbar/navbar';
import { PageBackdrop } from './shared/components/page-backdrop/page-backdrop';
import { RouteLoadingBar } from './shared/components/route-loading-bar/route-loading-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, PageBackdrop, RouteLoadingBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) route = route.firstChild;
      const seo = route.snapshot.data['seo'] as SeoConfig | undefined;
      if (seo) this.seoService.apply(seo);
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
