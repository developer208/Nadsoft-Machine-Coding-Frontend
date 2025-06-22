import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import * as yup from "yup";
import {
  useFindByIdQuery,
  useSubjectsQuery,
  useUpdateStudentMutation,
} from "../../../services/restApiInstance";
import { toastFn } from "../../../utils/toastFn";
import CustomError from "../../custom/error/CustomError";
import CustomLabel from "../../custom/label/CustomLabel";
import CustomButton from "../button/CustomButton";
import CustomInput from "../input/CustomInput";
import CustomSelect from "../select/CustomSelect";

type modelProps = {
  state: boolean;
  onOk: () => void;
  onCancel: () => void;
  refetchFn: () => void;
  id: any;
};

const CustomEditModel = ({
  state,
  onOk,
  onCancel,
  refetchFn,
  id,
}: modelProps) => {
  const [updateStudent] = useUpdateStudentMutation();
  const { data: subjects, refetch: subjectRefetch } = useSubjectsQuery();
  const {
    data: studentData,
    loading,
    refetch,
    isSuccess,
  } = useFindByIdQuery(id);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        name: yup.string().required("Name is required"),
        age: yup.string().required("Age is required "),
        subjects: yup
          .array()
          .of(
            yup.object({
              subjectName: yup.string().required("Enter Subject"),
              marks: yup
                .number()
                .typeError("Marks must be a number")
                .min(0, "Marks cannot be negative")
                .max(100, "Marks cannot exceed 100")
                .required("Enter Marks"),
            })
          )
          .notRequired(),
      })
    ),
    defaultValues: {
      email: "",
      name: "",
      age: undefined,
      subjects: [{ subjectName: "", marks: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects", // must match defaultValues
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Resetting with:", studentData.data);
      reset({
        email: studentData.data.email || "",
        name: studentData.data.name || "",
        age: studentData.data.age || "",
        subjects: studentData.data.subjects,
      });
      subjectRefetch();
    }

    return () => {
      reset();
    };
  }, [isSuccess, studentData, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await updateStudent({
      id,
      body: data,
    }).unwrap();
    if (response?.status) {
      onCancel();
      refetchFn();
    } else {
      toastFn("error", response?.message);
    }
  };

  console.log(errors);

  return (
    <Modal
      title="Add New Student"
      closable={{ "aria-label": "Custom Close Button" }}
      open={state}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomLabel className="w-full" value="Name" />
        <Controller
          name="name"
          control={control}
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
                {errors.name && <CustomError message={errors.name?.message} />}
              </>
            );
          }}
        />
        <CustomLabel className="w-full" value="Email" />
        <Controller
          name="email"
          control={control}
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
                {errors.email && (
                  <CustomError message={errors.email?.message} />
                )}
              </>
            );
          }}
        />
        <CustomLabel className="w-full" value="Age" />
        <Controller
          name="age"
          control={control}
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
                {errors.age && <CustomError message={errors.age?.message} />}
              </>
            );
          }}
        />
        <hr className="my-6" />

        <div className="my-3  flex flex-col gap-3 ">
          <h3 className="font-bold">Marks</h3>
          <div className="flex flex-col gap-3 ">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-start gap-2 my-2">
                {/* Subject Select */}
                <div>
                  <Controller
                    name={`subjects.${index}.subjectName`}
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <>
                          <CustomSelect
                            name={name}
                            value={value}
                            placeholder="Select Subject"
                            className="w-[150px]"
                            onChange={onChange}
                            options={subjects?.data}
                          />
                          {errors?.subjects?.[index]?.subjectName && (
                            <CustomError
                              message={
                                errors.subjects[index].subjectName?.message
                              }
                            />
                          )}
                        </>
                      );
                    }}
                  />
                </div>

                {/* Marks Input */}
                <div>
                  <Controller
                    name={`subjects.${index}.marks`}
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <>
                          <CustomInput
                            placeholder="Marks"
                            onChange={onChange}
                            name={name}
                            type="number"
                            className="!w-[80px]"
                            value={value}
                          />
                          {errors?.subjects?.[index]?.marks && (
                            <CustomError
                              message={errors.subjects[index].marks?.message}
                            />
                          )}
                        </>
                      );
                    }}
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-black cursor-pointer bg-red-400 h-[32px] px-2 py-1 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div
            className="flex gap-1 items-center bg-slate-200 px-2 py-1  w-fit rounded-lg cursor-pointer "
            onClick={() => {
              append({ subjectName: "", marks: "" });
            }}
          >
            Add
            <span>
              <IoIosAddCircleOutline size={16} />
            </span>
          </div>
        </div>
        <CustomButton htmlType="submit" onClick={() => {}} className="mt-3" />
      </form>
    </Modal>
  );
};

export default CustomEditModel;
