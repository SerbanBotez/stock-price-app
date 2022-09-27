import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import { getGithubData, getStockDataForDatetimeInterval } from "../../services";

interface StockData {
  closePrice: number;
  date: Date;
  volume: number;
}

interface UseDashboardReturnData {
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  getStockValues: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stockData: any;
  isLoading: boolean;
}

export const useDashboard = (): UseDashboardReturnData => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    data: stockData,
    isLoading,
    refetch: stockDataRefetch,
  } = useQuery(["stock"], () =>
    getStockDataForDatetimeInterval({
      symbol: "AAPL",
      resolution: "D",
      from: "1664210000",
      to: "1664278239",
    })
  );

  /* const { data, refetch: githubRefetch } = useQuery(["github"], () =>
    getGithubData()
  ); */

  /* const mapReturnedData = useCallback((): StockData[] => {
    const mappedData = stockData?.c.map((price) => {return {closePrice}: StockData})

    return 1;
  }, [stockData]);
*/
  const getStockValues = async () => {
    // console.log(startDate, endDate);
    if (moment(startDate).isAfter(moment(endDate))) {
      toast.error("Start date cannot be after End date");
    }
    await stockDataRefetch;
  };

  useEffect(() => {
    console.log(isLoading ? "Loading..." : stockData);
  }, [stockData, isLoading]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getStockValues,
    stockData,
    isLoading,
  };
};
