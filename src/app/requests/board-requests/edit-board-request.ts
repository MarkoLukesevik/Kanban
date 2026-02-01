import EditColumnRequest from '../column-requests/edit-column-request';

export default interface EditBoardRequest {
  id: string;
  name: string;
  columns: EditColumnRequest[];
}
