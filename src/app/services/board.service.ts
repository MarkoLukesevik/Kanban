import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import Board from '../models/board';
import CreateBoardRequest from '../requests/board-requests/create-board-request';
import EditBoardRequest from '../requests/board-requests/edit-board-request';
import Column from '../models/column';
import Task from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private allBoards = signal(<Board[]>[]);
  private selectedBoard = signal<Board | null>(null);
  constructor(private apiService: ApiService) {}

  public getSelectedBoard(): Signal<Board | null> {
    return this.selectedBoard;
  }

  public setSelectedBoard(board: Board): void {
    this.selectedBoard.set(board);
  }

  public getAllLocalBoards(): Signal<Board[]> {
    return this.allBoards;
  }

  public setAllBoards(boards: Board[]): void {
    this.allBoards.set(boards);
  }

  public addTaskToBoard(task: Task): void {
    const currentBoard: Board | null = this.selectedBoard();
    if (!currentBoard) return;

    const updatedBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map((column: Column) =>
        column.id === task.columnId
          ? { ...column, tasks: [...column.tasks, task] }
          : column,
      ),
    };

    this.selectedBoard.set(updatedBoard);
  }

  public getAllBoards(kanbanId: string): Observable<Board[]> {
    return this.apiService.get<Board[]>(`boards/${kanbanId}`);
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.apiService.get<Board>(`boards?id=${boardId}`);
  }

  public deleteBoard(boardId: string): Observable<void> {
    return this.apiService.delete(`boards?id=${boardId}`);
  }

  public createBoard(request: CreateBoardRequest): Observable<Board> {
    return this.apiService.post<Board>('boards', request);
  }

  public editBoard(request: EditBoardRequest): Observable<Board> {
    return this.apiService.put<Board>('boards', request);
  }
}
