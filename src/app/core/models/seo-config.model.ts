export interface SeoConfig {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. '/json-formatter'. */
  path: string;
  robots?: string;
}
