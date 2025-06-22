import { toast } from "react-toastify";

export const toastFn = (type: string, message: string) => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
