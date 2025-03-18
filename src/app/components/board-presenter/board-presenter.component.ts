import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService } from '../../services/board.service';
import { ThemeService } from '../../services/theme.service';

import Board from '../../models/board';
import Column from '../../models/column';
import Task from '../../models/task';
import Subtask from '../../models/subtask';

@Component({
  selector: 'app-board-presenter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-presenter.component.html',
  styleUrl: './board-presenter.component.scss',
})
export class BoardPresenterComponent {
  public board: Signal<Board | null>;

  constructor(
    private boardService: BoardService,
    public themeService: ThemeService,
  ) {
    this.board = this.boardService.getSelectedBoard();
  }

  public get columns(): Column[] {
    return this.board()?.columns ?? [];
  }

  public getNumberOfFinishedSubtasksForTask(task: Task): number {
    let finishedSubtasks = 0;

    task.subtasks.forEach((subtask: Subtask) => {
      if (subtask.isComplete) finishedSubtasks++;
    });

    return finishedSubtasks;
  }
}
