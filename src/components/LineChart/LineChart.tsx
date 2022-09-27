import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./LineChart.css";
import { ChartData } from "../../models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Stock Price Chart",
    },
  },
};

interface LineChartProps {
  chartData: ChartData;
}

export const LineChart = ({ chartData }: LineChartProps) => {
  return (
    <Line className="LineChart" options={options} data={{ ...chartData }} />
  );
};
