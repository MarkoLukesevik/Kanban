import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { BoardService } from '../../services/board.service';
import { ThemeService } from '../../services/theme.service';
import { ToastrService } from 'ngx-toastr';

import Board from '../../models/board';

@Component({
  selector: 'app-sidebar-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-boards.component.html',
  styleUrl: './sidebar-boards.component.scss',
})
export class SidebarBoardsComponent {
  public boards: Signal<Board[]> = this.boardService.getAllLocalBoards();
  public selectedBoard: Signal<Board | null> =
    this.boardService.getSelectedBoard();
  private isBoardSpinnerOn: boolean = false;

  constructor(
    private boardService: BoardService,
    private toastrService: ToastrService,
    public themeService: ThemeService,
  ) {}

  public handleBoardClick(clickedBoard: Board, event: Event): void {
    event.stopPropagation();

    if (this.isBoardSpinnerOn) return;
    this.isBoardSpinnerOn = true;

    this.boardService.getBoardById(clickedBoard.id).subscribe({
      next: (board: Board): void => {
        this.boardService.setSelectedBoard(board);
        this.isBoardSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastrService.error(httpErrorResponse.error.error);
        this.isBoardSpinnerOn = false;
      },
    });
  }
}
