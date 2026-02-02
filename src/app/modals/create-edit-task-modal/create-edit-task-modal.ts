import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from '../../services/theme-service/theme-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';
import { BoardService } from '../../services/board-service/board-service';
import { TaskService } from '../../services/task-service/task-service';

import { BaseInput } from '../../base-components/base-input/base-input';
import { BaseSelect } from '../../base-components/base-select/base-select';
import { BaseTextarea } from '../../base-components/base-textarea/base-textarea';
import { BaseModal } from '../../base-components/base-modal/base-modal';

import Task from '../../models/task';
import Subtask from '../../models/subtask';
import Board from '../../models/board';
import Column from '../../models/column';

import CreateSubtaskRequest from '../../requests/subtask-requests/create-subtask-request';
import CreateTaskRequest from '../../requests/task-requests/create-task-request';

@Component({
  selector: 'app-create-edit-task-modal',
  imports: [BaseModal, BaseInput, BaseSelect, BaseTextarea],
  templateUrl: './create-edit-task-modal.html',
  styleUrl: './create-edit-task-modal.scss',
})
export class CreateEditTaskModal implements OnInit {
  @Input() task!: Task;

  private themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private taskService: TaskService = inject(TaskService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);

  public allStatusOptions: string[] = [];

  public titleError: string = '';
  public subtaskErrors: string[] = [];

  private isEditMode: boolean = false;
  public isSaveButtonSpinnerOn: boolean = false;

  ngOnInit(): void {
    this.getAllStatusOptions();

    if (this.task) {
      this.isEditMode = true;
      this.subtaskErrors = this.task.subtasks.map((): string => '');
    } else this.initializeNewTask();
  }

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  private initializeNewTask(): void {
    this.task = {} as Task;
    this.task.title = '';
    this.task.description = '';
    this.task.subtasks = [];
    this.handleAddNewSubtask();
    this.task.status = this.allStatusOptions[0];
  }

  private getAllStatusOptions(): void {
    const board: Board | null = this.boardService.selectedBoard();

    if (!board) return;

    this.allStatusOptions = board.columns.map((column: Column) => column.name);
  }

  public getModalTitle(): string {
    return this.isEditMode ? 'Edit Task' : 'Create New Task';
  }

  public getSaveButtonName(): string {
    return this.isEditMode ? 'Edit Task' : 'Create Task';
  }

  public handleSubtaskRemove(index: number): void {
    this.task.subtasks.splice(index, 1);
    this.subtaskErrors.splice(index, 1);
  }

  public handleAddNewSubtask(): void {
    const subtask: Subtask = {
      taskId: this.task.id,
      isComplete: false,
      title: '',
    } as Subtask;

    this.task.subtasks.push(subtask);
    this.subtaskErrors.push('');
  }

  public handleSaveClick(): void {
    const isTaskValid: boolean = this.validateTask();
    if (!isTaskValid) return;

    const board: Board | null = this.boardService.selectedBoard();

    if (!board) return;

    this.isSaveButtonSpinnerOn = true;

    if (this.isEditMode) this.handleEditTask();
    else this.handleAddTask(board.id);
  }

  private handleEditTask(): void {
    if (!this.task) return;

    this.taskService.updateTask(this.task).subscribe({
      next: (updatedTask: Task) => {
        this.boardService.updateBoardTask(updatedTask);
        this.modalService.close();
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSaveButtonSpinnerOn = false;
      },
    });
  }

  private handleAddTask(boardId: string): void {
    const createSubtasksRequest: CreateSubtaskRequest[] = [];

    this.task.subtasks.forEach((subtask: Subtask) => {
      const createSubtaskRequest: CreateSubtaskRequest = {
        title: subtask.title,
      };
      createSubtasksRequest.push(createSubtaskRequest);
    });

    const taskColumn = this.boardService
      .selectedBoard()
      ?.columns.find((c) => c.name === this.task.status);

    const createTaskRequest: CreateTaskRequest = {
      boardId: boardId,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      subtasks: createSubtasksRequest,
      order: taskColumn ? taskColumn.tasks.length : 0,
    };

    this.taskService.createTask(createTaskRequest).subscribe({
      next: (task: Task): void => {
        this.modalService.close(task);
        this.boardService.addTaskToBoard(task);
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSaveButtonSpinnerOn = false;
      },
    });
  }

  private validateTask(): boolean {
    let isTaskValid: boolean = true;

    if (!this.task.title) {
      this.titleError = "Field can't be empty!";
      isTaskValid = false;
    } else this.titleError = '';

    this.task.subtasks.forEach((subtask: Subtask, index: number): void => {
      if (!subtask.title) {
        this.subtaskErrors[index] = "Field can't be empty!";
        isTaskValid = false;
      } else this.subtaskErrors[index] = '';
    });

    return isTaskValid;
  }
}
