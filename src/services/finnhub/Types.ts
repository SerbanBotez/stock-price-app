export interface SearchSymbolsRequest {
  query: string;
}

export interface GetStockDataForDatetimeIntervalRequest {
  symbol: string;
  resolution: 1 | 5 | 15 | 30 | 60 | "D" | "W" | "M";
  from: string;
  to: string;
}

export interface GetStockDataForDatetimeIntervalResponse {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
  s: string;
}
