export default interface Subtask {
  id: string;
  taskId: string;
  title: string;
  isComplete: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
}
