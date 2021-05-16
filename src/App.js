import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import About from "./component/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const toggleTask = await fetchTask(id);
    const updToggle = { ...toggleTask, reminder: !toggleTask.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updToggle),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const addTask = async (task) => {
    if (!task.id) {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    } else {
      editTask(task);
    }
  };

  const editTask = (newTask) => {
    setTask(newTask);

    setShowAddTask(true);
    console.log("check", newTask);
  };

  const updateTask = async (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setShowAddTask(!showAddTask);
    const editTask = await fetchTask(editedTask.id);
    const updTask = {
      ...editTask,
      text: editedTask.text,
      day: editedTask.day,
      reminder: editedTask.reminder,
    };
    const res = await fetch(`http://localhost:5000/tasks/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === editedTask.id
          ? {
              ...task,
              text: editedTask.text,
              day: editedTask.day,
              reminder: editedTask.reminder,
            }
          : task
      )
    );
    setTask();
  };

  const addTaskBtn = () => {
    setShowAddTask(!showAddTask);
    setTask();
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={addTaskBtn} showAddTask={showAddTask} />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask ? (
                <AddTask
                  onSaveTask={addTask}
                  editTask={task}
                  updateTask={updateTask}
                />
              ) : (
                ""
              )}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onReminder={toggleReminder}
                  onEdit={editTask}
                />
              ) : (
                "There is no tasks"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
