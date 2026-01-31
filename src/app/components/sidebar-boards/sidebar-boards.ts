import { Component, inject, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';

import Board from '../../models/board';

@Component({
  selector: 'app-sidebar-boards',
  imports: [],
  templateUrl: './sidebar-boards.html',
  styleUrl: './sidebar-boards.scss',
})
export class SidebarBoards {
  public themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private toastrService: ToastrService = inject(ToastrService);

  public boards: Signal<Board[]> = this.boardService.allBoards;
  public selectedBoard: Signal<Board | null> = this.boardService.selectedBoard;
  private isBoardSpinnerOn: boolean = false;

  constructor() {}

  public handleBoardClick(clickedBoard: Board, event: Event): void {
    event.stopPropagation();

    if (this.isBoardSpinnerOn) return;
    this.isBoardSpinnerOn = true;

    this.boardService.getBoardById(clickedBoard.id).subscribe({
      next: (board: Board): void => {
        this.boardService.selectedBoard.set(board);
        this.isBoardSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastrService.error(httpErrorResponse.error.error);
        this.isBoardSpinnerOn = false;
      },
    });
  }
}
