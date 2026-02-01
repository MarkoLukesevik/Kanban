import { Component, inject, Input, OnInit, Signal } from '@angular/core';

import { ModalService } from '../../../services/modal-service/modal-service';
import { ThemeService } from '../../../services/theme-service/theme-service';

import Task from '../../../models/task';
import { TaskInfoModal } from '../../../modals/task-info-modal/task-info-modal';
import { BoardService } from '../../../services/board-service/board-service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input({ required: true }) task!: Task;

  public themeService: ThemeService = inject(ThemeService);
  private modalService: ModalService = inject(ModalService);
  private boardService: BoardService = inject(BoardService);

  public subtasksCount!: Signal<number>;

  ngOnInit(): void {
    this.subtasksCount = this.boardService.getSubtasksCount(this.task.id);
  }

  public handleTaskClick(): void {
    this.modalService.open(TaskInfoModal, { taskId: this.task.id });
  }
}
