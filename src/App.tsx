import React from "react";
import "./styles/global.css";
import ProgressHeader from "./components/ProgressHeader";
import TodayTaskList from "./components/TodayTaskList";
import UpcomingTasks from "./components/UpcomingTasks";

const App: React.FC = () => {
  return (
    <div className="container">
      <ProgressHeader />
      <TodayTaskList />
      <UpcomingTasks />
    </div>
  );
};

export default App;
