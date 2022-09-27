import { Chart, DateTimePicker } from "../../components";
import { useDashboard } from "./useDashboard";
import "./Dashboard.css";

const Dashboard = (): JSX.Element => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getStockValues,
    stockData,
    isLoading,
  } = useDashboard();

  return (
    <div className="Dashboard">
      <div className="DateInputArea">
        <DateTimePicker
          label="Start Date"
          selectedDate={startDate}
          onChange={setStartDate}
        />
        <DateTimePicker
          label="End Date"
          selectedDate={endDate}
          onChange={setEndDate}
        />
        <button type="button" onClick={getStockValues}>
          Get Stock Values
        </button>
      </div>
      <div className="ChartArea">
        <Chart />
      </div>
    </div>
  );
};
export default Dashboard;
