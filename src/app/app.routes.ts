import { Routes } from '@angular/router';
import { SeoConfig } from './core/models/seo-config.model';

function seo(config: SeoConfig): { seo: SeoConfig } {
  return { seo: config };
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    title: 'DevDiffy — Developer tools that save hours, not seconds',
    data: seo({
      title: 'DevDiffy — Developer tools that save hours, not seconds',
      description:
        'Format JSON, compare text, and inspect differences with a fast, free, privacy-first toolbox built for developers. No signup, works offline.',
      path: '/',
    }),
  },
  {
    path: 'json-formatter',
    loadComponent: () => import('./pages/json-formatter/json-formatter.page').then((m) => m.JsonFormatterPage),
    title: 'JSON Formatter — Pretty print, minify & validate JSON | DevDiffy',
    data: seo({
      title: 'JSON Formatter — Pretty print, minify & validate JSON | DevDiffy',
      description:
        'Paste JSON to pretty-print, minify, or explore it as a collapsible tree, with inline validation errors and syntax highlighting. Runs entirely in your browser.',
      path: '/json-formatter',
      breadcrumbLabel: 'JSON Formatter',
    }),
  },
  {
    path: 'text-compare',
    loadComponent: () => import('./pages/text-compare/text-compare.page').then((m) => m.TextComparePage),
    title: 'Text Compare — Side-by-side & inline diff tool | DevDiffy',
    data: seo({
      title: 'Text Compare — Side-by-side & inline diff tool | DevDiffy',
      description:
        'Compare two versions of any text or code and see exactly what changed, side-by-side or inline, with ignore-whitespace and one-click copy.',
      path: '/text-compare',
      breadcrumbLabel: 'Text Compare',
    }),
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs.page').then((m) => m.DocsPage),
    title: 'Documentation — DevDiffy',
    data: seo({
      title: 'Documentation — DevDiffy',
      description:
        "Everything you need to know about DevDiffy's JSON Formatter and Text Compare tools, plus keyboard shortcuts and privacy details.",
      path: '/docs',
      breadcrumbLabel: 'Documentation',
    }),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
    title: 'About Nitesh Kumar — DevDiffy',
    data: seo({
      title: 'About Nitesh Kumar — DevDiffy',
      description:
        'Nitesh Kumar is a full stack software developer from India building fast, privacy-first developer tools like DevDiffy.',
      path: '/about',
      breadcrumbLabel: 'About',
    }),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage),
    title: 'Privacy Policy — DevDiffy',
    data: seo({
      title: 'Privacy Policy — DevDiffy',
      description:
        "DevDiffy's JSON Formatter and Text Compare tools run entirely in your browser — read what data is (and isn't) collected.",
      path: '/privacy',
      breadcrumbLabel: 'Privacy Policy',
    }),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.page').then((m) => m.TermsPage),
    title: 'Terms of Use — DevDiffy',
    data: seo({
      title: 'Terms of Use — DevDiffy',
      description: 'The terms for using DevDiffy, a free set of browser-based JSON formatting and text comparison tools.',
      path: '/terms',
      breadcrumbLabel: 'Terms of Use',
    }),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'Page not found — DevDiffy',
    data: seo({
      title: 'Page not found — DevDiffy',
      description: 'The page you were looking for could not be found.',
      path: '/404',
      robots: 'noindex, nofollow',
    }),
  },
];
