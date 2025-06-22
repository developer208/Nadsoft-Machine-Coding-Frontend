import { Select } from "antd";

type selectProps = {
  options: Array<{ label: string; value: string }>;
  onChange: () => void;
  value?: string;
  name?: string;
  placeholder?: string;
  className?: string;
};

const CustomSelect = ({
  options,
  onChange,
  value = undefined,
  placeholder = "select",
  className,
}: selectProps) => {
  return (
    <Select
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={onChange}
      //   onSearch={onSearch}
      className={`${className}`}
      value={value}
      options={options}
    />
  );
};

export default CustomSelect;
