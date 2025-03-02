import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService } from '../../services/board.service';
import { ThemeService } from '../../services/theme.service';

import Board from '../../models/board';

@Component({
  selector: 'app-sidebar-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-boards.component.html',
  styleUrl: './sidebar-boards.component.scss',
})
export class SidebarBoardsComponent {
  public boards = this.boardService.getAllLocalBoards();
  public selectedBoard = this.boardService.getSelectedBoard();
  constructor(
    private boardService: BoardService,
    public themeService: ThemeService,
  ) {}

  public handleBoardClick(board: Board, event: Event): void {
    event.stopPropagation();
    this.boardService.setSelectedBoard(board);
  }
}
