import Board from './board';

export default interface Kanban {
  id: string;
  userId: string;
  boards: Board[];
}
