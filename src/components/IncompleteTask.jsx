import { IoMdCheckmark } from "react-icons/io";
import PropTypes from "prop-types";
export default function IncompleteTask({ task }) {
  return (
    <div className="bg-zinc-100 rounded-md py-2 px-2 bg-opacity-40 flex items-center gap-3 cursor-pointer">
      <IoMdCheckmark size={28} color="white" fontWeight={"bold"} />
      <h3 className="text-lg font-regular text-gray-700 ">{task.title}</h3>
    </div>
  );
}

IncompleteTask.propTypes = {
  task: PropTypes.object.isRequired,
};
