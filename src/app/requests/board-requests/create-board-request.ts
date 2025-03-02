export default interface CreateBoardRequest {
  name: string;
  kanbanId: string;
  columns: string[];
}
