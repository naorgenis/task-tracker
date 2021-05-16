import { useState, useEffect } from "react";

const AddTask = ({ onSaveTask, editTask, updateTask }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const onEdit = () => {
      if (editTask) {
        setText(editTask.text);
        setDay(editTask.day);
        setReminder(editTask.reminder);
      }
    };

    onEdit();
  }, [editTask]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("please insert a task");
      return;
    }

    if (editTask) {
      const id = editTask.id;
      updateTask({ id, text, day, reminder });
    } else {
      onSaveTask({ text, day, reminder });
    }

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={(e) => onSubmit(e)}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="save task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
