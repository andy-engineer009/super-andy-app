import { useEffect, useState } from "react";
import { EveryDayTasksData } from "../data/EveryDayTasksData";
// import "./DailyTaskCard.css";

const DailyTaskCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    const filteredData = EveryDayTasksData.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() === currentDay && taskDate.getMonth() === currentMonth;
    });

    setData(filteredData);
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedData = data.map((task) => {
      const updatedTodoList = task.todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return { ...task, todoList: updatedTodoList };
    });
    setData(updatedData);
  };

  return (
    <div className="wildlife-container">
      <div className="wild-top" />
      <h1 className="wild-heading">🌄 Daily WildTasks 🌲</h1>
      {data.length === 0 ? (
        <p className="no-task">No tasks today! 🌞</p>
      ) : (
        data.map((task) => (
          <div className="task-card" key={task.id}>
            <h2 className="task-title text-center">{task.title}</h2>
            {task.todoList.map((todo) => (
              <label className="todo-item" key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                <span className={todo.completed ? "checked" : ""}>{todo.title}</span>
              </label>
            ))}
          </div>
        ))
      )}
      <div className="wild-bottom" />
    </div>
  );
};

export default DailyTaskCard;
