import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  value: Date;
  label: string;
  onChange: (value: Date) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  label,
  onChange,
}) => {
  return (
    <div className="relative flex flex-col w-full gap-y-2.5">
      <label
        className={`
            text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]
        `}
      >
        {label}
      </label>
      <DatePicker
        selected={value}
        onChange={(value) => onChange(value as Date)}
        className="text-xs w-full py-4 px-5 font-bold bg-white dark:bg-[#1E2139] text-[#0C0E16] dark:text-white border border-[#DFE3FA] dark:border-[#252945] rounded outline-none transition disabled:cursor-not-allowed"
        dateFormat="dd MMM yyyy"
      />
    </div>
  );
};

export default DatePickerInput;
