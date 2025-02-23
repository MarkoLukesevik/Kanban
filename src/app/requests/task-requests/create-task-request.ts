import CreateSubtaskRequest from '../subtask-requests/create-subtask-request';

export default interface CreateTaskRequest {
  boardId: string;
  title: string;
  description: string;
  status: string;
  subtasks: CreateSubtaskRequest[];
}
