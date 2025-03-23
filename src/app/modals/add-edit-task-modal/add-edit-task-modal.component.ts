import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';
import { ThemeService } from '../../services/theme.service';

import Task from '../../models/task';
import Board from '../../models/board';
import Subtask from '../../models/subtask';
import Column from '../../models/column';

import EditTaskRequest from '../../requests/task-requests/edit-task-request';
import EditSubtaskRequest from '../../requests/subtask-requests/edit-subtask-request';
import CreateSubtaskRequest from '../../requests/subtask-requests/create-subtask-request';
import CreateTaskRequest from '../../requests/task-requests/create-task-request';

import { BaseModalComponent } from '../../base-components/base-modal/base-modal.component';
import { BaseInputComponent } from '../../base-components/base-input/base-input.component';
import { BaseTextareaComponent } from '../../base-components/base-textarea/base-textarea.component';
import { BaseSelectComponent } from '../../base-components/base-select/base-select.component';

@Component({
  selector: 'app-add-edit-task-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
    CommonModule,
    BaseInputComponent,
    BaseTextareaComponent,
    BaseSelectComponent,
  ],
  templateUrl: './add-edit-task-modal.component.html',
  styleUrl: './add-edit-task-modal.component.scss',
})
export class AddEditTaskModalComponent implements OnInit {
  @Input() taskId: string | undefined;

  public task: Task = {} as Task;
  public allStatusOptions: string[] = [];

  public titleError: string = '';
  public subtaskErrors: string[] = [];

  private isEditMode: boolean = false;
  public isSaveButtonSpinnerOn: boolean = false;

  constructor(
    private modalService: ModalService,
    private boardService: BoardService,
    private taskService: TaskService,
    private toastrService: ToastrService,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.getAllStatusOptions();

    if (this.taskId) {
      this.isEditMode = true;
      this.taskService.getTaskById(this.taskId).subscribe((task: Task) => {
        this.task = task;
      });
    } else {
      this.task.description = '';
      this.task.subtasks = [];
      this.handleAddNewSubtask();
      this.task.status = this.allStatusOptions[0];
    }
  }

  private getAllStatusOptions(): void {
    const board: Board | null = this.boardService.getSelectedBoard()();

    if (!board) return;

    this.allStatusOptions = board.columns.map((column: Column) => column.name);
  }

  public getModalTitle(): string {
    return this.isEditMode ? 'Edit Task' : 'Add New Task';
  }

  public getSaveButtonName(): string {
    return this.isEditMode ? 'Edit Task' : 'Create Task';
  }

  public handleSubtaskRemove(index: number) {
    this.task.subtasks.splice(index, 1);
  }

  public handleAddNewSubtask() {
    const subtask: Subtask = {} as Subtask;
    this.task.subtasks.push(subtask);
  }

  public handleSaveClick(): void {
    const isTaskValid: boolean = this.validateTask();
    if (!isTaskValid) return;

    const board: Board | null = this.boardService.getSelectedBoard()();

    if (!board) return;

    this.isSaveButtonSpinnerOn = true;

    if (this.isEditMode) this.handleEditTask();
    else this.handleAddTask(board.id);
  }

  private handleEditTask(): void {
    if (!this.taskId) return;

    const editSubtasksRequest: EditSubtaskRequest[] = [];

    this.task.subtasks.forEach((subtask: Subtask) => {
      const subtaskRequest: EditSubtaskRequest = {
        id: subtask.id,
        title: subtask.title,
        isCompleted: subtask.isComplete,
      };

      editSubtasksRequest.push(subtaskRequest);
    });

    const editTaskRequest: EditTaskRequest = {
      id: this.taskId,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      subtasks: editSubtasksRequest,
    };

    this.taskService.editTask(editTaskRequest).subscribe({
      next: (task: Task) => {
        this.modalService.close(task);
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.error);
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

    const createTaskRequest: CreateTaskRequest = {
      boardId: boardId,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      subtasks: createSubtasksRequest,
    };

    this.taskService.createTask(createTaskRequest).subscribe({
      next: (task: Task) => {
        this.modalService.close(task);
        this.boardService.addTaskToBoard(task);
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.error);
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
