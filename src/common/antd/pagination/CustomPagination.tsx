import { Pagination } from "antd";
import { useEffect, useState } from "react";

type Props = {
  callback: (page: number, limit: number) => void;
  totalRecords: number;
};

const CustomPagination = ({ callback, totalRecords }: Props) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const onChange = (page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
  };

  useEffect(() => {
    callback(current, pageSize);
  }, [current, pageSize, callback]);

  return (
    <div>
      <Pagination
        className="flex"
        total={totalRecords}
        current={current}
        pageSize={pageSize}
        pageSizeOptions={["5", "10", "15", "20", "50", "100"]}
        showSizeChanger
        showTotal={(total) => `Total ${total} items`}
        responsive
        onChange={onChange}
      />
    </div>
  );
};

export default CustomPagination;
