import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import { getStockDataForDatetimeInterval, logError } from "../../services";
import { ChartData, StockPrice } from "../../models";
import { getChartColor } from "../../utils";

interface UseDashboardReturnData {
  searchQuery: string;
  startDate: Date;
  endDate: Date;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  getStockValues: () => void;
  chartData: ChartData | undefined;
  isFetching: boolean;
}

export const useDashboard = (): UseDashboardReturnData => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "d").toDate()
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  const {
    data: stockData,
    isFetching,
    refetch: stockDataRefetch,
  } = useQuery(
    ["stock"],
    () =>
      getStockDataForDatetimeInterval({
        symbol: searchQuery,
        // TODO give possibility to the user to select resolution
        resolution: "D",
        from: moment(startDate).unix().toString(),
        to: moment(endDate).unix().toString(),
      }),
    { enabled: false }
  );

  useEffect(() => {
    if (stockData) {
      if (stockData.s !== "ok") {
        toast.error("No data could be found for this symbol and interval");
        setChartData(undefined);
        return;
      }

      const labels = stockData?.t.map((timestamp) =>
        moment.unix(timestamp).format("MM/DD/YYYY")
      );

      const prices = Object.entries(stockData).filter(
        (entry) => entry[0] !== "t" && entry[0] !== "v" && entry[0] !== "s"
      );

      let lastIndex = 0;
      const datasets = prices.map((price, index) => {
        const [priceType, values] = price;
        const color = getChartColor(index);
        let label = "";

        switch (priceType) {
          case "c": {
            label = StockPrice.c;
            break;
          }
          case "o": {
            label = StockPrice.o;
            break;
          }
          case "h": {
            label = StockPrice.h;
            break;
          }
          case "l": {
            label = StockPrice.l;
            break;
          }
          default: {
            logError(`No price could be found for property ${priceType}`).then(
              (r) => r
            );
          }
        }

        lastIndex = index;
        return {
          label,
          data: values,
          backgroundColor: color,
          borderColor: color,
        };
      });

      const highAndLowDatasets = datasets.filter(
        (dataset) =>
          dataset.label === StockPrice.l || dataset.label === StockPrice.h
      );

      let sum = 0;
      highAndLowDatasets.forEach(
        // eslint-disable-next-line no-return-assign
        (dataset) =>
          (sum += dataset.data.reduce((a: number, b: number) => a + b, 0))
      );

      const average = sum / (highAndLowDatasets[0].data.length * 2);
      datasets.push({
        label: "Average",
        data: Array(highAndLowDatasets[0].data.length).fill(average),
        backgroundColor: getChartColor(lastIndex + 1),
        borderColor: getChartColor(lastIndex + 1),
      });

      setChartData({ labels, datasets });
    }
  }, [stockData]);

  const getStockValues = async () => {
    if (moment(startDate).isAfter(moment(endDate))) {
      toast.error("Start date cannot be after End date");
    } else {
      await stockDataRefetch();
    }
  };

  return {
    startDate,
    endDate,
    searchQuery,
    setStartDate,
    setEndDate,
    setSearchQuery,
    getStockValues,
    chartData,
    isFetching,
  };
};
