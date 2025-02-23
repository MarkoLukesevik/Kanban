import EditSubtaskRequest from '../subtask-requests/edit-subtask-request';

export default interface EditTaskRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: EditSubtaskRequest[];
}
