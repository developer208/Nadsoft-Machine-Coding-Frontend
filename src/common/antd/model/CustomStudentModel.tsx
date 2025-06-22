import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAddStudentMutation } from "../../../services/restApiInstance";
import { toastFn } from "../../../utils/toastFn";
import CustomError from "../../custom/error/CustomError";
import CustomLabel from "../../custom/label/CustomLabel";
import CustomButton from "../button/CustomButton";
import CustomInput from "../input/CustomInput";

type modelProps = {
  state: boolean;
  onOk: () => void;
  onCancel: () => void;
  refetchFn: () => void;
};

const CustomStudentModel = ({
  state,
  onOk,
  onCancel,
  refetchFn,
}: modelProps) => {
  const [addStudent] = useAddStudentMutation();
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAdd,
    formState: { errors: addrrors },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        name: yup.string().required("Name is required"),
        age: yup.string().required("Age is required "),
      })
    ),
    defaultValues: {
      email: "",
      name: "",
      age: undefined,
    },
  });

  useEffect(() => {
    if (!state) {
      resetAdd();
    }
  }, [state]);

  const onSubmit = async (data: any) => {
    const response = await addStudent({ ...data }).unwrap();
    if (response?.status) {
      onCancel();
      refetchFn();
    } else {
      toastFn("error", response?.message);
    }
  };

  return (
    <Modal
      title="Add New Student"
      closable={{ "aria-label": "Custom Close Button" }}
      open={state}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleAddSubmit(onSubmit)}>
        <CustomLabel className="w-full" value="Name" />
        <Controller
          name="name"
          control={addControl}
          render={({ field: { name, value, onChange } }) => {
            return (
              <>
                <CustomInput
                  placeholder="Enter the Name"
                  onChange={onChange}
                  name={name}
                  type="text"
                  className="w-full"
                  value={value}
                />
                {addrrors.name && (
                  <CustomError message={addrrors.name?.message} />
                )}
              </>
            );
          }}
        />
        <CustomLabel className="w-full" value="Email" />
        <Controller
          name="email"
          control={addControl}
          render={({ field: { name, value, onChange } }) => {
            return (
              <>
                <CustomInput
                  placeholder="Enter the email"
                  onChange={onChange}
                  name={name}
                  type="email"
                  className="w-full"
                  value={value}
                />
                {addrrors.email && (
                  <CustomError message={addrrors.email?.message} />
                )}
              </>
            );
          }}
        />
        <CustomLabel className="w-full" value="Age" />
        <Controller
          name="age"
          control={addControl}
          render={({ field: { name, value, onChange } }) => {
            return (
              <>
                <CustomInput
                  placeholder="Enter the age"
                  onChange={onChange}
                  name={name}
                  type="number"
                  className="w-full"
                  value={value}
                />
                {addrrors.age && (
                  <CustomError message={addrrors.age?.message} />
                )}
              </>
            );
          }}
        />
        <CustomButton htmlType="submit" onClick={() => {}} className="mt-3" />
      </form>
    </Modal>
  );
};

export default CustomStudentModel;
