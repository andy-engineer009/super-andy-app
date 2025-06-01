import { useEffect, useState } from "react";
import type { TaskDay } from "../data/roadmapData";
import { getProgress, saveProgress } from "../utils/localStorage";

const DayCard = ({ dayData }: { dayData: TaskDay }) => {
  const key = `day${dayData.day}`;
  const saved = getProgress();
  const [tasksDone, setTasksDone] = useState<boolean[]>(saved[key] || new Array(dayData.tasks.length).fill(false));

  useEffect(() => {
    saveProgress({ ...saved, [key]: tasksDone });
  }, [tasksDone]);

  return (
    <div className="card">
      <h2>Day {dayData.day}: {dayData.title}</h2>
      {dayData.tasks.map((task, idx) => (
        <div key={idx} className="task">
          <input
            type="checkbox"
            checked={tasksDone[idx]}
            onChange={() => {
              const updated = [...tasksDone];
              updated[idx] = !updated[idx];
              setTasksDone(updated);
            }}
          />
          <span className={tasksDone[idx] ? "line-through" : ""}>{task}</span>
        </div>
      ))}
    </div>
  );
};

export default DayCard;
