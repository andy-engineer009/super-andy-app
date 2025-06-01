import React from "react";
import { roadmap } from "../data/roadmapData";

const UpcomingTasks: React.FC = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  const upcoming = roadmap.filter(day => day.date > todayDate);

  return (
    <section>
      <h2>🔮 Upcoming Days</h2>
      {upcoming.map((day, i) => (
        <div key={i}>
          <h3>{day.date}</h3>
          <ul>
            {day.tasks.map((task, j) => (
              <li key={j}>{task.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default UpcomingTasks;