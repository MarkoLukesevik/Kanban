import CreateColumnRequest from '../columns-requests/create-column-request';

export default interface EditBoardRequest {
  id: string;
  name: string;
  columns: CreateColumnRequest[];
}
