import React from "react";
import { roadmap } from "../data/roadmapData";

const ProgressHeader: React.FC = () => {
  const totalTasks = roadmap.flatMap(day => day.tasks).length;
  const completedTasks = roadmap.flatMap(day => day.tasks).filter(task => task.done).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <section>
      <h2>🔥 Your React Mastery Progress</h2>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{completedTasks} of {totalTasks} tasks completed ({progress}%)</p>
    </section>
  );
};

export default ProgressHeader;