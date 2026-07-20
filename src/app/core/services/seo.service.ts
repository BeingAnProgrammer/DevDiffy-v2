import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoConfig } from '../models/seo-config.model';

const SITE_URL = 'https://devdiffy.rvnk.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Applies per-route title, meta description, canonical URL, Open Graph and
 * Twitter card tags. Driven by each route's `data.seo` (see app.routes.ts).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  apply(config: SeoConfig): void {
    const url = `${SITE_URL}${config.path}`;
    const robots = config.robots ?? 'index, follow';

    this.title.setTitle(config.title);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: robots });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: DEFAULT_OG_IMAGE });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: DEFAULT_OG_IMAGE });

    this.setCanonical(url);
    this.setBreadcrumb(config, url);
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.head.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects a two-level Home > Page BreadcrumbList schema; removed on routes with no breadcrumbLabel (home, 404). */
  private setBreadcrumb(config: SeoConfig, url: string): void {
    const existing = this.document.head.querySelector('#breadcrumb-schema');
    if (!config.breadcrumbLabel) {
      existing?.remove();
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: config.breadcrumbLabel, item: url },
      ],
    };

    let script = existing as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', 'breadcrumb-schema');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}
