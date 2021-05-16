import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AddTask } from "./AddTask";

const Task = ({ task, onDelete, onReminder, onEdit }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onReminder(task.id)}
    >
      <h3>
        {task.text}
        <div className="icons">
          <FaEdit onClick={() => onEdit(task)} style={{ cursor: "pointer" }} />
          <FaTimes
            onClick={() => onDelete(task.id)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
