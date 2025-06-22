import type { ValueGetterParams } from "ag-grid-community";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "./common/antd/button/CustomButton";
import CustomeDeleteModel from "./common/antd/model/CustomDeleteModel";
import CustomEditModel from "./common/antd/model/CustomEditModel";
import CustomStudentModel from "./common/antd/model/CustomStudentModel";
import CustomPagination from "./common/antd/pagination/CustomPagination";
import CustomTable from "./common/custom/table/CustomTable";
import { useStudentsQuery } from "./services/restApiInstance";
import { UserDeleteButton, UserEditButton } from "./utils/cellButtons";
import { tech_stack } from "./utils/data";

function App() {
  const [modelState, setModelState] = useState(false);
  const [deleteModelState, setDeleteModelState] = useState(false);
  const [editModelState, setEditModelState] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, loading, refetch } = useStudentsQuery({ page, limit });
  const [record, setRecord] = useState(null);

  const handleDelete = (props: any) => {
    // delMutation.mutate(props.rollNo);
    console.log("Clicked");
    setDeleteModelState(true);
    setRecord(props);
  };
  const handleEdit = (props: any) => {
    // router.push(`/admin/dashboard/users/editUser/${props.rollNo}`);
    setRecord(props?.id);
    setEditModelState(true);
  };

  const getParams = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  return (
    <div className="min-h-screen w-screen   flex flex-col items-center justify-center  ">
      <div className="w-full lg:max-w-4xl h-[70px] flex items-center gap-2 border-[1px]  border-slate-200 shadow-md">
        <h3 className=" text-lg lg:text-2xl mx-5 ">
          NadSoft Machine Coding (React + Node )
        </h3>
      </div>
      <div className=" mt-3 w-full lg:max-w-4xl h-[70px] flex items-center justify-end gap-2 ">
        <CustomButton
          className="w-[200px] mx-5"
          onClick={() => {
            setModelState(true);
          }}
          value="Add Student"
        />
      </div>
      <div className=" mt-3 w-full lg:max-w-4xl h-full flex flex-col gap-2 border-[1px] p-5  border-slate-200 shadow-md  ">
        <CustomTable
          rowData={data ? data?.data : []}
          colDefs={[
            { field: "name" },
            { field: "email" },
            { field: "age" },
            {
              field: "Edit",
              cellRenderer: (props: ValueGetterParams) => (
                <div className="mt-[5px] ">
                  <UserEditButton func={handleEdit} {...props} />
                </div>
              ),
              width: 90,
            },
            {
              field: "Delete",
              cellRenderer: (props: ValueGetterParams) => (
                <div className=" mt-[8px] ">
                  <UserDeleteButton func={handleDelete} {...props} />
                </div>
              ),
              width: 90,
            },
          ]}
        />
        <div className="mt-3">
          <CustomPagination
            callback={getParams}
            totalRecords={data ? data?.total : 0}
          />
        </div>
      </div>
      <div className="w-full lg:max-w-4xl h-auto flex flex-col  border-[1px]  border-slate-200 shadow-md">
        <h1 className=" text-lg lg:text-2xl px-5 pt-5 ">Tech Stack Used</h1>
        <ul className="flex gap-2 flex-wrap px-5 pb-5 ">
          {tech_stack.map((i: string) => {
            return <li className="text-lg ">{i}</li>;
          })}
        </ul>
      </div>
      <CustomStudentModel
        state={modelState}
        onOk={() => {}}
        onCancel={() => {
          setModelState(false);
        }}
        refetchFn={refetch}
      />
      <CustomeDeleteModel
        state={deleteModelState}
        onOk={() => {}}
        onCancel={() => {
          setDeleteModelState(false);
        }}
        refetchFn={refetch}
        data={record}
      />
      <CustomEditModel
        id={record}
        state={editModelState}
        onOk={() => {}}
        onCancel={() => {
          setEditModelState(false);
        }}
        refetchFn={refetch}
      />
      <ToastContainer autoClose={1500} className="z-50" />
    </div>
  );
}

export default App;
