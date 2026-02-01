import { Component, computed, inject, Input, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';
import { TaskService } from '../../services/task-service/task-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';

import { BaseModal } from '../../base-components/base-modal/base-modal';

import Task from '../../models/task';

@Component({
  selector: 'app-delete-task-modal',
  imports: [BaseModal],
  templateUrl: './delete-task-modal.html',
  styleUrl: './delete-task-modal.scss',
})
export class DeleteTaskModal {
  @Input() task!: Task;

  public isDeleteButtonSpinnerOn: boolean = false;

  private themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private taskService: TaskService = inject(TaskService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleDeleteClick(): void {
    this.isDeleteButtonSpinnerOn = true;
    this.taskService.deleteTask(this.task.id).subscribe({
      next: (): void => {
        this.boardService.deleteBoardTask(this.task);
        this.modalService.close();
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isDeleteButtonSpinnerOn = false;
      },
    });
  }

  public handleCancelClick(): void {
    this.modalService.close();
  }
}
