import { Button } from "antd";

type buttonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  value?: string;
  htmlType?: "submit" | "button" | "reset";
  style?: React.CSSProperties;
};

const CustomButton = ({
  className = "",
  disabled = false,
  value = "Submit",
  htmlType = "button",
  onClick,
  style = {},
}: buttonProps) => {
  return (
    <Button
      htmlType={htmlType}
      type="default"
      onClick={onClick}
      danger={false}
      className={`  !h-[45px] !text-white  !bg-slate-800 rounded-xl hover:!bg-slate-900 active:!bg-slate-700  ${className}`}
      disabled={disabled}
      style={style}
    >
      {value}
    </Button>
  );
};

export default CustomButton;
