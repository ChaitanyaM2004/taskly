import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskServices";
import { FaPlus, FaEdit, FaCheck, FaTrash, FaList, FaClock, FaFlag } from "react-icons/fa";

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
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isFormVisible, setIsFormVisible] = useState(false);

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
      setNewTask({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "pending",
        priority: "medium",
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ ...task });
    setIsFormVisible(true);
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
      setIsFormVisible(false);
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

  const toggleTaskForm = () => {
    setIsFormVisible(!isFormVisible);
    if (editingTask && !isFormVisible) {
      setEditingTask(null);
      setNewTask({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "pending",
        priority: "medium",
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-yellow-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "on hold": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and organize your tasks efficiently</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={toggleTaskForm}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              {isFormVisible ? "Cancel" : <>
                <FaPlus className="mr-2" />
                <span>Add New Task</span>
              </>}
            </button>
          </div>
        </div>

        {/* Task Form */}
        {isFormVisible && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:row-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={handleChange}
                  className="w-full h-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newTask.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newTask.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on hold">On Hold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-gray-700 font-medium">Filter by:</span>
          <button 
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
            All
          </button>
          <button 
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
            Pending
          </button>
          <button 
            onClick={() => setFilter("in progress")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "in progress" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
            In Progress
          </button>
          <button 
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
            Completed
          </button>
          <button 
            onClick={() => setFilter("on hold")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "on hold" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
            On Hold
          </button>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaList className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No tasks found</h3>
            <p className="text-gray-500 mt-2">
              {filter === "all" 
                ? "You don't have any tasks yet. Create one to get started!" 
                : `You don't have any ${filter} tasks.`}
            </p>
            {!isFormVisible && (
              <button
                onClick={toggleTaskForm}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus className="inline mr-2" />
                Create Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 mr-3">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>Due: {new Date(task.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaFlag className={`mr-1 ${getPriorityColor(task.priority)}`} />
                        <span className={getPriorityColor(task.priority)}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleUpdateTask(task._id, { status: "completed" })}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full transition"
                      title="Mark as completed"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
