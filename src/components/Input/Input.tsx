import { ChangeEvent, useId } from "react";
import "./input.css";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, placeholder, value, onChange }: InputProps) => {
  const id = useId();
  return (
    <div className="Input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
