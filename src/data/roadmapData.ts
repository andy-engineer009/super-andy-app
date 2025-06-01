export interface Task {
  title: string;
  done: boolean;
}

export interface TaskDay {
  date: string; // YYYY-MM-DD
  tasks: Task[];
}

export const roadmap: TaskDay[] = [
  {
    date: "2025-06-01",
    tasks: [
      { title: "JSX & Components", done: false },
      { title: "useState Hook", done: false }
    ]
  },
  {
    date: "2025-06-02",
    tasks: [
      { title: "Props & Children", done: false },
      { title: "useEffect Hook", done: false }
    ]
  },
  {
    date: "2025-06-03",
    tasks: [
      { title: "Event Handling", done: false },
      { title: "Conditional Rendering", done: false }
    ]
  },
  {
    date: "2025-06-04",
    tasks: [
      { title: "Lists & Keys", done: false },
      { title: "Forms", done: false }
    ]
  }
];