import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';

import { TaskComponent } from './task/task.component';
import Column from '../../models/column';
import Board from '../../models/board';

@Component({
  selector: 'app-board-presenter',
  imports: [TaskComponent],
  templateUrl: './board-presenter.html',
  styleUrl: './board-presenter.scss',
})
export class BoardPresenter {
  public themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);

  public board: WritableSignal<Board | null> = this.boardService.selectedBoard;
  public columns: Signal<Column[]> = this.boardService.columns;

  constructor() {}

  public isLoading: Signal<boolean> = computed((): boolean => !this.board());
}
