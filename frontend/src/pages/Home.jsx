import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskServices";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "pending",
    priority: "medium",
  });

  const [editingTask, setEditingTask] = useState(null); // Store task being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        const data = await getTasks();
        setTasks(data);
    } catch (error) {
        console.error("Error fetching tasks", error);
    }
};


  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.startDate || !newTask.endDate) {
        alert("Title, Start Date, and End Date are required");
        return;
    }
    try {
        await createTask(newTask);
        fetchTasks();
    } catch (error) {
        console.error("Error adding task", error);
    }
};


  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ ...task });
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask._id, newTask);
      setEditingTask(null);
      setNewTask({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "pending",
        priority: "medium",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editingTask ? "Edit Task" : "My Tasks"}
        </h2>

        {/* Task Input Form */}
        <div className="flex flex-col space-y-3 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex space-x-2">
            <input
              type="date"
              name="startDate"
              value={newTask.startDate}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="endDate"
              value={newTask.endDate}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-2">
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on hold">On Hold</option>
            </select>

            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {editingTask ? (
            <button
              onClick={handleUpdateTask}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Update Task
            </button>
          ) : (
            <button
              onClick={handleAddTask}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Add Task
            </button>
          )}
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-lg font-medium">{task.title}</span>
                <span className="text-sm text-gray-500">
                  {task.status} | {task.priority}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleUpdateTask(task._id, { status: "completed" })}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
