import { useId } from "react";
import ReactDateTimePicker from "react-datetime-picker";
import "./DateTimePicker.css";

interface DateTimePickerProps {
  label: string;
  selectedDate: Date;
  onChange: (newDate: Date) => void;
}

export const DateTimePicker = ({
  label,
  selectedDate,
  onChange,
}: DateTimePickerProps) => {
  const id = useId();

  return (
    <div className="DateTimePickerContainer">
      <label htmlFor={id}>{label}</label>
      <ReactDateTimePicker name={id} value={selectedDate} onChange={onChange} />
    </div>
  );
};
