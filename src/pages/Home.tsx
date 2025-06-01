import { roadmap } from "../data/roadmapData";
import DayCard from "../components/DayCard";
import ProgressBar from "../components/ProgressBar";
import { getProgress } from "../utils/localStorage";

const Home = () => {
  const progress = getProgress();
  let total = 0, completed = 0;

  roadmap.forEach(day => {
    total += day.tasks.length;
    const done = progress[`day${day.day}`] || [];
    done.forEach(v => v && completed++);
  });

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>React Learning Tracker</h1>
      <ProgressBar completed={completed} total={total} />
      <div style={{ marginTop: "1.5rem" }}>
        {roadmap.map(day => (
          <DayCard key={day.day} dayData={day} />
        ))}
      </div>
    </div>
  );
};

export default Home;
