export type DiffOpType = 'equal' | 'delete' | 'insert';

export interface DiffOp {
  type: DiffOpType;
  a?: string;
  b?: string;
}

export interface SideDiffRow {
  key: number;
  leftNum: number | '';
  leftText: string;
  leftBg: string;
  leftColor: string;
  rightNum: number | '';
  rightText: string;
  rightBg: string;
  rightColor: string;
}

export interface InlineDiffRow {
  key: number;
  sign: string;
  text: string;
  bg: string;
  color: string;
  num: number;
}

export type CompareView = 'side' | 'inline';
