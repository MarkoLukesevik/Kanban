import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import Board from '../models/board';
import CreateBoardRequest from '../requests/board-requests/create-board-request';
import EditBoardRequest from '../requests/board-requests/edit-board-request';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private selectedBoard = signal<Board | null>(null);
  constructor(private apiService: ApiService) {}

  public getBoard(): Signal<Board | null> {
    return this.selectedBoard;
  }

  public setBoard(board: Board): void {
    this.selectedBoard.set(board);
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
