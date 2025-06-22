import { Input } from "antd";
import type React from "react";

type inputProps = {
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
};

const CustomInput = ({
  placeholder = "Enter",
  className = "",
  onChange,
  type = "text",
  name = "input",
  disabled = false,
  value = "",
}: inputProps) => {
  return (
    <div className={` w-full ${className}`}>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        disabled={disabled}
        name={name}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
