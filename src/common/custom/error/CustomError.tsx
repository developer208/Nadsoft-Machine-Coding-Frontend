type errorProps = {
  message?: string;
};

const CustomError = ({ message = "" }: errorProps) => {
  return <div className="text-red-500 text-sm ">{message}</div>;
};

export default CustomError;
