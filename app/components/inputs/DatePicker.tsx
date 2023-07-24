import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface DatePickerInputProps {
  id: string;
  value: Date;
  label: string;
  register: UseFormRegister<FieldValues>;
  onChange: (value: Date) => void;
  errors: FieldErrors;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  id,
  value,
  label,
  register,
  onChange,
  errors,
}) => {
  return (
    <div className="relative flex flex-col w-full gap-y-2.5">
      <label
        className={`
            text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]
            ${errors[id] && "text-[#EC5757] dark:text-[#EC5757]"}
        `}
      >
        {label}
      </label>
      <DatePicker
        {...register(id, {
          required: {
            value: true,
            message: "can't be empty",
          },
        })}
        selected={value}
        onChange={(value) => onChange(value as Date)}
        className={`text-xs w-full py-4 px-5 font-bold bg-white dark:bg-[#1E2139] text-[#0C0E16] dark:text-white border border-[#DFE3FA] dark:border-[#252945] rounded outline-none transition disabled:cursor-not-allowed
                    ${
                      errors[id] &&
                      "border-[#EC5757] focus:border-[#EC5757] dark:border-[#EC5757] dark:focus:border-[#EC5757]"
                    }`}
        dateFormat="dd MMM yyyy"
      />
      {errors[id] && (
        <span className="absolute top-0 right-0 text-[7px] font-medium text-[#EC5757] lowercase max-w-[40px]">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default DatePickerInput;
