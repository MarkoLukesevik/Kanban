import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import Board from '../../models/board';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-boards.component.html',
  styleUrl: './sidebar-boards.component.scss',
})
export class SidebarBoardsComponent implements OnInit {
  public boards: Board[] = [];
  public selectedBoard: Board | null = null;
  constructor(
    private boardService: BoardService,
    public themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.boards = this.boardService.getAllLocalBoards()();
    this.selectedBoard = this.boardService.getSelectedBoard()();
  }

  public handleBoardClick(board: Board, event: Event): void {
    event.stopPropagation();
    this.boardService.setSelectedBoard(board);
  }
}
