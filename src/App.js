import React, { useState } from "react";
import "./Sidebar.css";
import "./MainContent.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>


function App() {
  const [tasks, setTasks] = useState([
  ]);
  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, categoryIndex) => categoryIndex !== index));
  };
  

  const [categories, setCategories] = useState([
    { name: "Personal", color: "#f48fb1" },
    { name: "Freelance", color: "#81d4fa" },
    { name: "Work", color: "#ffcc80" },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newTask, setNewTask] = useState({ text: "", time: "", category: "" });
  const [taskInputVisible, setTaskInputVisible] = useState(false);
  

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([
        ...categories,
        { name: newCategory, color: getRandomColor() },
      ]);
      setNewCategory("");
    }
  };

  const addTask = () => {
    if (newTask.text.trim() !== "" && newTask.time && newTask.category) {
      setTasks([
        ...tasks,
        { ...newTask, completed: false },
      ]);
      setNewTask({ text: "", time: "", category: "" });
      setTaskInputVisible(false);
    }
  };

  const handleEditTask = (index) => {
    const updatedText = prompt("Edit task", tasks[index].text);
    if (updatedText) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index].text = updatedText;
        return updatedTasks;
      });
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const getRandomColor = () => {
    const colors = ["#f48fb1", "#81d4fa", "#ffcc80"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const formatTime = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 hour (midnight) to 12
    return `${hour12}:${minute < 10 ? "0" + minute : minute} ${suffix}`;
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="profile">
        <img
          src="https://plus.unsplash.com/premium_photo-1661892088256-0a17130b3d0d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          className="profile-image"
        />

          <h2 className="profile-name">
            Do-it<br />
            Baishali
          </h2>
        </div>
        <nav className="menu">
        <h3><i className="fas fa-calendar-alt"></i> Today's Task</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="category-item">
                <span
                  className="category-dot"
                  style={{ backgroundColor: category.color }}
                ></span>
                <span>{category.name}</span>
          
              <button
                className="delete-category-button"
                onClick={() => handleDeleteCategory(index)}
              >
                <i className="fas fa-trash"></i> {/* Trash bin icon */}
              </button>
              </li>
            ))}
            <li className="add-category">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add filter"
                className="new-category-input"
              />
              <button onClick={addCategory} className="add-category-button">
                +
              </button>
            </li>
          </ul>
        </nav>
        <h3><i className="fas fa-calendar-alt"></i> Scheduled Meetings</h3>
        <h3>
          <i className="fas fa-cogs"></i> Settings
        </h3>


      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Today's Focus</h1>
          <h2>
            <strong>Dream big. Start small. Act now.</strong>
          </h2>
        </header>

        {/* Task Add Box */}
        <div className="add-task-box">
          <button
            className="add-task-button"
            onClick={() => setTaskInputVisible(!taskInputVisible)}
          >
            +
          </button>

          {taskInputVisible && (
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Task Description"
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              />
              <input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button onClick={addTask}>Add Task</button>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.map((task, index) => (
            <div className="task-item" key={index}>
              <span
                className="task-category-dot"
                style={{
                  backgroundColor: categories.find(
                    (cat) => cat.name.toLowerCase() === task.category
                  )?.color,
                }}
              ></span>
              <span className="task-text">{task.text}</span>
              <span className="task-time">{formatTime(task.time)}</span>
              <div className="task-actions">
                <button onClick={() => handleEditTask(index)} className="task-edit-button">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="task-delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
