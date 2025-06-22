type labelProps = {
  className?: string;
  value?: string;
};

const CustomLabel = ({ className = "", value = "label" }: labelProps) => {
  return <label className={`${className}`}>{value}</label>;
};

export default CustomLabel;
