export interface TaskType {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface DataTaskType {
  limit: number;
  page: number;
  tasks: TaskType[];
  totalPage: number;
  totalTasks: number;
}