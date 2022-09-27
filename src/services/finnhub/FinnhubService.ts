import axios from "axios";
import { APIConstants } from "../constants";
import {
  GetStockDataForDatetimeIntervalRequest,
  GetStockDataForDatetimeIntervalResponse,
  SearchSymbolsRequest,
} from "./Types";

export const searchSymbols = async (req: SearchSymbolsRequest) => {
  return axios
    .request({
      method: "get",
      url: `${APIConstants.BASE_URL}/search?q=${req.query}&token=${APIConstants.API_KEY}`,
    })
    .then((response) => {
      return response.data;
    });
};

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
