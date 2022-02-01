export interface Index {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  trend: string;
  color: string;
  change: number;
  exchange: 'INDEX';
  open: number;
  previousClose: number;
  timestamp: number;
}
