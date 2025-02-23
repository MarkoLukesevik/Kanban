import Column from './column';

export default interface Board {
  id: string;
  kanbanId: string;
  name: string;
  columns: Column[];
  createdAt: Date;
  lastModifiedAt: Date;
}
