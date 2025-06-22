import { Modal } from "antd";
import { useDeleteStudentMutation } from "../../../services/restApiInstance";
import { toastFn } from "../../../utils/toastFn";

type modelProps = {
  state: boolean;
  onOk: () => void;
  onCancel: () => void;
  refetchFn: () => void;
  data: any;
};

const CustomeDeleteModel = ({
  state,
  onOk,
  onCancel,
  refetchFn,
  data,
}: modelProps) => {
  const [deleteStudent] = useDeleteStudentMutation();

  return (
    <Modal
      title="Delete Record"
      open={state}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      closable={false}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">Are you Sure ?</h1>
        <h3 className="text-xl">
          If you delete this member, this action can not be undone
        </h3>
        <div className="flex gap-3">
          <div
            className=" bg-blue-300 px-4 py-2 cursor-pointer rounded-lg  "
            onClick={async () => {
              const response = await deleteStudent(data?.id).unwrap();
              console.log(response);
              if (response?.status) {
                refetchFn();
                onCancel();
                toastFn("success", response?.message);
              } else {
                onCancel();
                toastFn("error", response?.message);
              }
            }}
          >
            Delete It !
          </div>
          <div
            className="bg-red-500 px-4 py-2 cursor-pointer rounded-lg "
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomeDeleteModel;
