import CreateColumnRequest from '../column-requests/create-column-request';

export default interface EditBoardRequest {
  id: string;
  name: string;
  columns: CreateColumnRequest[];
}
