import {
  LineChart,
  DateTimePicker,
  Input,
  LoadingSpinner,
} from "../../components";
import { useDashboard } from "./useDashboard";
import "./Dashboard.css";

const Dashboard = (): JSX.Element => {
  const {
    startDate,
    endDate,
    searchQuery,
    setStartDate,
    setEndDate,
    setSearchQuery,
    getStockValues,
    chartData,
    isFetching,
  } = useDashboard();

  return (
    <div className="Dashboard">
      <div className="DateInputArea">
        <Input
          label="Symbol"
          placeholder="Write a symbol"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          chartData && <LineChart chartData={chartData} />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
