import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export function UserEditButton(props: any) {
  return (
    <button
      onClick={() => {
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <FiEdit size={20} style={{ color: "black" }} />
    </button>
  );
}

export function UserDeleteButton(props: any) {
  return (
    <button
      onClick={() => {
        console.log(props.data);
        props.func(props.data);
      }}
      className="hover:text-purple-600 cursor-pointer "
    >
      <MdDelete size={24} style={{ color: "red" }} />;
    </button>
  );
}
