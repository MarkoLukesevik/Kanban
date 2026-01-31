import {
  Component,
  computed,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import Task from '../../models/task';
import { ThemeService } from '../../services/theme-service/theme-service';
import { TaskService } from '../../services/task-service/task-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ClickOutsideDirective } from '../../directives/click-outside-directive/click-outside-directive';
import { BaseModal } from '../../base-components/base-modal/base-modal';
import { CreateEditTaskModal } from '../create-edit-task-modal/create-edit-task-modal';
import { DeleteTaskModal } from '../delete-task-modal/delete-task-modal';
import { BaseCheckbox } from '../../base-components/base-checkbox/base-checkbox';
import Subtask from '../../models/subtask';
import { BaseSelect } from '../../base-components/base-select/base-select';
import Board from '../../models/board';
import Column from '../../models/column';
import { BoardService } from '../../services/board-service/board-service';
import EditSubtaskRequest from '../../requests/subtask-requests/edit-subtask-request';
import EditTaskRequest from '../../requests/task-requests/edit-task-request';

@Component({
  selector: 'app-task-info-modal',
  imports: [ClickOutsideDirective, BaseModal, BaseCheckbox, BaseSelect],
  templateUrl: './task-info-modal.html',
  styleUrl: './task-info-modal.scss',
})
export class TaskInfoModal implements OnInit, OnDestroy {
  @Input() taskId: string | undefined;

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public task!: Task;
  public isDropdownActive: boolean = false;
  public allStatusOptions: string[] = [];

  public themeService: ThemeService = inject(ThemeService);
  private taskService: TaskService = inject(TaskService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);
  private boardService: BoardService = inject(BoardService);

  ngOnInit(): void {
    this.isLoading.set(true);
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task: Task): void => {
          this.task = task;
          this.getAllStatusOptions();
          this.isLoading.set(false);
        },
        error: (httpErrorResponse: HttpErrorResponse): void => {
          this.toastService.error(httpErrorResponse.error.error);
          this.isLoading.set(false);
          this.modalService.close();
        },
      });
    }
  }

  ngOnDestroy(): void {
    const editSubtasksRequest: EditSubtaskRequest[] = [];

    this.task.subtasks.forEach((subtask: Subtask) => {
      const subtaskRequest: EditSubtaskRequest = {
        id: subtask.id,
        title: subtask.title,
        isComplete: subtask.isComplete,
      };

      editSubtasksRequest.push(subtaskRequest);
    });

    const editTaskRequest: EditTaskRequest = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      subtasks: editSubtasksRequest,
    };

    this.taskService.editTask(editTaskRequest).subscribe({
      next: (task: Task): void => {
        this.task = task;
        this.boardService.updateBoardTask(task);
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
      },
    });
  }

  private getAllStatusOptions(): void {
    const board: Board | null = this.boardService.selectedBoard();

    if (!board) return;

    this.allStatusOptions = board.columns.map((column: Column) => column.name);
  }

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public subtasksCount: Signal<number> = computed(
    (): number => this.task.subtasks.filter((s: Subtask) => s.isComplete).length,
  );

  public toggleSubtask(subtask: Subtask): void {
    subtask.isComplete = !subtask.isComplete;
  }

  public toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  public handleEditClick(): void {
    this.modalService.close();
    this.modalService.open(CreateEditTaskModal, { task: this.task });
  }

  public handleDeleteClick(): void {
    this.modalService.close();
    this.modalService.open(DeleteTaskModal, { task: this.task });
  }
}
