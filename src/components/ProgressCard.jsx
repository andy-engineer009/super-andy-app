import { useEffect, useState } from "react";
import { EveryDayTasksData } from "../data/EveryDayTasksData";
import "../css/ProgressCard.css";

const ProgressCard = () => {
  const [data, setData] = useState([]);
  const [today, setToday] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);

    const storedProgress = JSON.parse(localStorage.getItem("jungle-tasks-progress")) || {};

    const updatedData = EveryDayTasksData.map((task) => {
      const savedTodos = storedProgress[task.date];
      const todoList = task.todoList.map((todo) => {
        const saved = savedTodos?.find((t) => t.id === todo.id);
        return saved ? { ...todo, completed: saved.completed } : todo;
      });
      return { ...task, todoList };
    });

    // Determine which task to activate
    const sortedTasks = [...updatedData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const completedDays = sortedTasks.filter((task) =>
      task.todoList.every((todo) => todo.completed)
    );

    const nextTask = sortedTasks.find(
      (task) => !task.todoList.every((todo) => todo.completed)
    );

    const finalData = [];

    if (nextTask) {
      const activeId = nextTask.id;
      setActiveTaskId(activeId);

      // move active task to top
      finalData.push(nextTask);
      sortedTasks.forEach((task) => {
        if (task.id !== activeId) {
          finalData.push(task);
        }
      });

      const isCompleted = nextTask.todoList.every((todo) => todo.completed);
      setShowNextButton(isCompleted);
    } else {
      finalData.push(...sortedTasks); // all completed
    }

    setData(finalData);
  }, []);

  const handleCheckboxChange = (taskDate, todoId) => {
    const updated = data.map((task) => {
      if (task.date === taskDate) {
        const updatedTodos = task.todoList.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        return { ...task, todoList: updatedTodos };
      }
      return task;
    });

    setData(updated);

    const updatedProgress = {};
    updated.forEach((task) => {
      updatedProgress[task.date] = task.todoList.map(({ id, completed }) => ({
        id,
        completed,
      }));
    });
    localStorage.setItem("jungle-tasks-progress", JSON.stringify(updatedProgress));

    const currentTask = updated.find((task) => task.date === taskDate);
    const isCompleted = currentTask.todoList.every((todo) => todo.completed);
    setShowNextButton(isCompleted);
  };

  const goToNextDay = () => {
    const currentIndex = data.findIndex((task) => task.id === activeTaskId);
    const nextTask = data[currentIndex + 1];
    if (nextTask) {
      setActiveTaskId(nextTask.id);
      setShowNextButton(nextTask.todoList.every((todo) => todo.completed));
    }
  };

  const totalTasks = data.length;
  const completedTasks = data.filter((task) =>
    task.todoList.every((todo) => todo.completed)
  ).length;

  return (
    <div className="progress-container">
      <div className="wild-top" />
      <h1 className="progress-heading">🪵 Jungle Progress Tracker 🐾</h1>

      <div className="stats-row">
        <div className="stat-box">
          <h2>Total Days</h2>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-box">
          <h2>Completed Days</h2>
          <p>{completedTasks}</p>
        </div>
      </div>

      <div className="task-grid">
        {data.map((task) => {
          const isActive = task.id === activeTaskId;
          return (
            <div
              key={task.id}
              className={`progress-card ${isActive ? "active-card" : "disabled-card"}`}
            >
              <h3>{task.title}</h3>
              {task.todoList.map((todo) => (
                <label key={todo.id} className="todo-row">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled={!isActive}
                    onChange={() => handleCheckboxChange(task.date, todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
              ))}
            </div>
          );
        })}
      </div>

      {/* ✅ Show "Next Day Task" button only if current day's todos are complete */}
      {showNextButton && (
        <div className="next-button-wrapper">
          <button className="next-button" onClick={goToNextDay}>
            Go to Next Day Task ⏭️
          </button>
        </div>
      )}

      <div className="wild-bottom" />
    </div>
  );
};

export default ProgressCard;