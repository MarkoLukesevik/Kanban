import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { BoardService } from '../../services/board-service/board-service';

import { TaskComponent } from './task/task.component';
import { AddNewColumnModal } from '../../modals/add-new-column-modal/add-new-column-modal';

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
  private modalService: ModalService = inject(ModalService);

  public board: WritableSignal<Board | null> = this.boardService.selectedBoard;
  public columns: Signal<Column[]> = this.boardService.selectedBoardColumns;

  constructor() {}

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleAddNewColumnClick(): void {
    this.modalService.open(AddNewColumnModal);
  }
}
