export const getProgress = (): Record<string, boolean[]> => {
  const saved = localStorage.getItem("react-progress");
  return saved ? JSON.parse(saved) : {};
};

export const saveProgress = (data: Record<string, boolean[]>) => {
  localStorage.setItem("react-progress", JSON.stringify(data));
};
