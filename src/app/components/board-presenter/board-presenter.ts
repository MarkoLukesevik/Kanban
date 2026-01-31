import { Component, computed, inject, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';

import { TaskComponent } from './task/task.component';

import Board from '../../models/board';
import Column from '../../models/column';

@Component({
  selector: 'app-board-presenter',
  imports: [TaskComponent],
  templateUrl: './board-presenter.html',
  styleUrl: './board-presenter.scss',
})
export class BoardPresenter {
  public themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);

  public board!: Signal<Board | null>;

  constructor() {
    this.board = this.boardService.selectedBoard;
  }

  public isLoading = computed(() => !this.board());

  public columns: Signal<Column[]> = computed((): Column[] => this.board()?.columns ?? []);
}
