export interface SeoConfig {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. '/json-formatter'. */
  path: string;
  robots?: string;
  /** Short label for the breadcrumb trail, e.g. 'JSON Formatter'. Omit for the home page. */
  breadcrumbLabel?: string;
}
