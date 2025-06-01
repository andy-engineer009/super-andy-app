const ProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percent = (completed / total) * 100;
  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={{ width: `${percent}%` }} />
    </div>
  );
};
export default ProgressBar;
