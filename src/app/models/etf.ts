

export interface ETF {
  symbol: string,
  name: string,
  price: number,
  changesPercentage: number,
  change: number,
  dayLow: number,
  dayHigh: number,
  yearHigh: number,
  yearLow: number,
  exchange: string,
  open: number,
  previousClose: number,
  timestamp: number,
}
