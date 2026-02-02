import Subtask from './subtask';

export default interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
  createdAt: Date;
  lastModifiedAt: Date;
  order: number;
}
