import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from '../../services/theme-service/theme-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { BoardService } from '../../services/board-service/board-service';
import { TaskService } from '../../services/task-service/task-service';
import { ToastrService } from 'ngx-toastr';

import { TaskComponent } from './task/task.component';
import { AddNewColumnModal } from '../../modals/add-new-column-modal/add-new-column-modal';

import Column from '../../models/column';
import Board from '../../models/board';
import Task from '../../models/task';

@Component({
  selector: 'app-board-presenter',
  imports: [TaskComponent, CdkDropList, DragDropModule],
  templateUrl: './board-presenter.html',
  styleUrl: './board-presenter.scss',
})
export class BoardPresenter {
  public themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private taskService: TaskService = inject(TaskService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);

  public board: WritableSignal<Board | null> = this.boardService.selectedBoard;
  public columns: Signal<Column[]> = this.boardService.selectedBoardColumns;

  public connectedDropLists: string[] = [];
  public isDragAndDropSaving: boolean = false;

  constructor() {
    this.updateConnectedDropLists();
  }

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleAddNewColumnClick(): void {
    this.modalService.open(AddNewColumnModal);
  }

  private updateConnectedDropLists(): void {
    this.connectedDropLists = this.columns().map((col: Column): string => col.id);
  }

  public dropTask(event: CdkDragDrop<Column['tasks']>, column: Column): void {
    if (!event.item.data || this.isDragAndDropSaving) return;

    const task = event.item.data as Task;

    this.isDragAndDropSaving = true;
    if (event.previousContainer === event.container) {
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      const previousColumn: Column | undefined = this.columns().find(
        (col: Column) => col.tasks === event.previousContainer.data,
      );
      if (!previousColumn) return;

      transferArrayItem(
        previousColumn.tasks,
        column.tasks,
        event.previousIndex,
        event.currentIndex,
      );
    }

    task.columnId = column.id;
    task.status = column.name;
    task.order = event.currentIndex;

    column.tasks.forEach((t, index) => {
      t.order = index;
    });

    this.taskService.updateTask(task).subscribe({
      next: (updatedTask: Task) => {
        this.boardService.updateBoardTask(updatedTask);
        this.isDragAndDropSaving = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isDragAndDropSaving = false;
      },
    });
  }
}
