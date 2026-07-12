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
