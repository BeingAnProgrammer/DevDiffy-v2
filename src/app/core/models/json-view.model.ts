export interface JsonToken {
  text: string;
  color: string;
}

export interface JsonLineRow {
  num: number;
  tokens: JsonToken[];
}

export interface JsonTreeRow {
  key: string;
  num: number;
  indent: number;
  arrow: string;
  arrowVisible: boolean;
  hasKey: boolean;
  keyName: string;
  bracketOpen: string;
  showCollapsedTail: boolean;
  collapsedLabel: string;
  bracketClose: string;
  showValue: boolean;
  valueText: string;
  valueColor: string;
  comma: string;
}

export interface WorktreeRow {
  key: string;
  text: string;
}

export type JsonOutputMode = 'pretty' | 'minify' | 'tree';
