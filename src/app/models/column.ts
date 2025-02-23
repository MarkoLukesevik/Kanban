import Task from './task';

export default interface Column {
  id: string;
  boardId: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
  lastModifiedAt: Date;
}
