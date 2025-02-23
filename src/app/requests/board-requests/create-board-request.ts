import CreateColumnRequest from '../columns-requests/create-column-request';

export default interface CreateBoardRequest {
  name: string;
  kanbanId: string;
  columns: CreateColumnRequest[];
}
