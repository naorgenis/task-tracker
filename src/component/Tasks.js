import Task from "./Task";
import AddTask from "./AddTask";

const Tasks = ({ tasks, onDelete, onReminder, onEdit }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onReminder={onReminder}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default Tasks;
