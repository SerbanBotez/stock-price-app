import axios from "axios";
import { APIConstants } from "../constants";

export const getGithubData = async () => {
  return axios
    .request({
      method: "get",
      url: "https://api.github.com/repos/tannerlinsley/react-query",
    })
    .then((response) => {
      return response.data;
    });
};

export const getSymbols = async () => {
  return axios
    .request({
      method: "get",
      url: `${APIConstants.BASE_URL}/search?q=symbol&token=${APIConstants.API_KEY}`,
    })
    .then((response) => {
      return response.data;
    });
};

interface GetCompanyProfileBySymbolRequest {
  symbol: string;
}

export const getCompanyProfileBySymbol = async (
  req: GetCompanyProfileBySymbolRequest
) => {
  return axios
    .request({
      method: "get",
      url: `${APIConstants.BASE_URL}/stock/profile2?symbol=${req.symbol}&token=${APIConstants.API_KEY}`,
    })
    .then((response) => {
      return response.data;
    });
};

interface GetStockDataForDatetimeIntervalRequest {
  symbol: string;
  resolution: 1 | 5 | 15 | 30 | 60 | "D" | "W" | "M";
  from: string;
  to: string;
}

interface GetStockDataForDatetimeIntervalResponse {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
  s: string;
}

export const getStockDataForDatetimeInterval = async (
  req: GetStockDataForDatetimeIntervalRequest
): Promise<GetStockDataForDatetimeIntervalResponse> => {
  return axios
    .request({
      method: "get",
      url: `${APIConstants.BASE_URL}/stock/candle?symbol=${req.symbol}&resolution=${req.resolution}&from=${req.from}&to=${req.to}&token=${APIConstants.API_KEY}`,
    })
    .then((response) => {
      return response.data;
    });
};
