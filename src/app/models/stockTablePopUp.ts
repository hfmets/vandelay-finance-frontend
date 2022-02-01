export interface StockElement {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_close: number;
  split_factor: number;
  dividend: number;
  symbol: string;
  exchange: number;
  date: Date;
}
