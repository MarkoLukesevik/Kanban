import { Component, computed, inject, Input, Signal } from '@angular/core';

import { ModalService } from '../../../services/modal-service/modal-service';
import { ThemeService } from '../../../services/theme-service/theme-service';

import Task from '../../../models/task';
import Subtask from '../../../models/subtask';
import { TaskInfoModal } from '../../../modals/task-info-modal/task-info-modal';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  public themeService: ThemeService = inject(ThemeService);
  private modalService: ModalService = inject(ModalService);

  get subtasksCount(): number {
    return this.task.subtasks.filter((s) => s.isComplete).length;
  }

  public handleTaskClick(): void {
    this.modalService.open(TaskInfoModal, { taskId: this.task.id });
  }
}
