export interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
}

export interface AppContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
} 