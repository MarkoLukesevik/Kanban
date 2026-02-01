import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import Board from '../../models/board';
import Task from '../../models/task';
import Column from '../../models/column';

import CreateBoardRequest from '../../requests/board-requests/create-board-request';
import EditBoardRequest from '../../requests/board-requests/edit-board-request';
import Subtask from '../../models/subtask';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public allBoards: WritableSignal<Board[]> = signal(<Board[]>[]);
  public selectedBoard: WritableSignal<Board | null> = signal<Board | null>(null);

  constructor(private apiService: ApiService) {}

  public selectedBoardColumns: Signal<Column[]> = computed(
    (): Column[] => this.selectedBoard()?.columns ?? [],
  );

  public selectedBoardTasks: Signal<Task[]> = computed((): Task[] =>
    this.selectedBoardColumns().flatMap((column: Column): Task[] => column.tasks),
  );

  public getSubtasksCount(taskId: string): Signal<number> {
    return computed((): number => {
      const task: Task | undefined = this.selectedBoardTasks().find((t: Task) => t.id === taskId);
      return task ? task.subtasks.filter((s: Subtask) => s.isComplete).length : 0;
    });
  }

  public addColumnToSelectedBoard(column: Column): void {
    const currentBoard: Board | null = this.selectedBoard();
    if (!currentBoard) return;

    const updatedBoard: Board = {
      ...currentBoard,
      columns: [...currentBoard.columns, column],
    };

    this.selectedBoard.set(updatedBoard);
  }

  public addTaskToBoard(task: Task): void {
    const currentBoard: Board | null = this.selectedBoard();
    if (!currentBoard) return;

    const updatedBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map(
        (column: Column): Column =>
          column.id === task.columnId ? { ...column, tasks: [...column.tasks, task] } : column,
      ),
    };

    this.selectedBoard.set(updatedBoard);
  }

  public updateBoardTask(updatedTask: Task): void {
    const currentBoard: Board | null = this.selectedBoard();
    if (!currentBoard) return;

    const updatedBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map((column: Column) => {
        const filteredTasks: Task[] = column.tasks.filter(
          (task: Task) => task.id !== updatedTask.id,
        );

        if (column.id === updatedTask.columnId) {
          return {
            ...column,
            tasks: [...filteredTasks, updatedTask],
          };
        }

        return {
          ...column,
          tasks: filteredTasks,
        };
      }),
    };

    this.selectedBoard.set(updatedBoard);
  }

  public deleteBoardTask(deleteTask: Task): void {
    const currentBoard: Board | null = this.selectedBoard();
    if (!currentBoard) return;

    const updatedBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map((column: Column) => {
        if (column.id !== deleteTask.columnId) {
          return column;
        }

        return {
          ...column,
          tasks: column.tasks.filter((task: Task) => task.id !== deleteTask.id),
        };
      }),
    };

    this.selectedBoard.set(updatedBoard);
  }

  // region api
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
  // endregion
}
