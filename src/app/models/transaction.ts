export interface Transaction {
  kind: string;
  ticker: string;
  value: number;
  sharesTransacted: number;
  date: Date;
}
