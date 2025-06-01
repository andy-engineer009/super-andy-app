import React, { useState, useEffect } from "react";
import { roadmap, type TaskDay } from "../data/roadmapData";

const TodayTaskList: React.FC = () => {
  const [today, setToday] = useState<TaskDay | null>(null);

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem("roadmapData");
    const parsed = stored ? JSON.parse(stored) : roadmap;
    let todayTask = parsed.find((d: TaskDay) => d.date === todayDate);
    if (!todayTask) todayTask = parsed[0];
    setToday(todayTask);
  }, []);

  const toggleTask = (index: number, done: boolean) => {
    if (!today) return;
    const stored = localStorage.getItem("roadmapData");
    const parsed = stored ? JSON.parse(stored) : roadmap;
    const updatedTasks = [...today.tasks];
    updatedTasks[index].done = done;
    const newToday = { ...today, tasks: updatedTasks };
    const updatedRoadmap = parsed.map((day: TaskDay) =>
      day.date === newToday.date ? newToday : day
    );
    localStorage.setItem("roadmapData", JSON.stringify(updatedRoadmap));
    setToday(newToday);
  };

  return (
    <section>
      <h2>🧠 Today's Tasks</h2>
      {today?.tasks.map((task, index) => (
        <div className="task" key={index}>
          <span>{task.title}</span>
          <div className="checkbox-group">
            <label className={`checkbox-wrapper ${task.done ? "active done" : ""}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(index, true)}
                className="checkbox-input"
              />
              <span className="checkbox-custom">
                <span className="tick-icon">✓</span>
              </span>
            </label>
            
            <label className={`checkbox-wrapper ${!task.done ? "active not-done" : ""}`}>
              <input
                type="checkbox"
                checked={!task.done}
                onChange={() => toggleTask(index, false)}
                className="checkbox-input"
              />
              <span className="checkbox-custom">
                <span className="cross-icon">✕</span>
              </span>
            </label>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TodayTaskList;