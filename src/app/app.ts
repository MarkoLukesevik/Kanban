import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from './services/theme-service/theme-service';
import { UserService } from './services/user-service/user-service';
import { ModalService } from './services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';
import { KanbanService } from './services/kanban-service/kanban-service';
import { BoardService } from './services/board-service/board-service';

import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { BoardPresenter } from './components/board-presenter/board-presenter';

import { RegisterLoginModal } from './modals/register-login-modal/register-login-modal';

import User from './models/user';
import Kanban from './models/kanban';
import Board from './models/board';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, BoardPresenter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public isSidebarVisible: boolean = true;

  private themeService: ThemeService = inject(ThemeService);
  private userService: UserService = inject(UserService);
  private modalService: ModalService = inject(ModalService);
  private kanbanService: KanbanService = inject(KanbanService);
  private boardService: BoardService = inject(BoardService);
  private toastService: ToastrService = inject(ToastrService);

  public isBoardLoading: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    const user: User | null = this.userService.getLoggedInUser()();
    if (user) this.getKanbanForUser(user.id);
    else
      this.modalService
        .open(RegisterLoginModal)
        .subscribe((user: User) => this.getKanbanForUser(user.id));
  }

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public boardsLength: Signal<number> = computed(
    (): number => this.boardService.allBoards().length,
  );

  public toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  private getKanbanForUser(userId: string): void {
    this.isBoardLoading.set(true);
    this.kanbanService.getKanbanForUser(userId).subscribe({
      next: (kanban: Kanban): void => {
        this.kanbanService.kanbanBoard.set(kanban);
        if (kanban.boards.length > 0) {
          this.boardService.allBoards.set(kanban.boards);
          this.boardService.getBoardById(kanban.boards[0].id).subscribe({
            next: (board: Board): void => {
              this.boardService.selectedBoard.set(board);
              this.isBoardLoading.set(false);
            },
            error: (httpErrorResponse: HttpErrorResponse) => {
              this.toastService.error(httpErrorResponse.error.error);
              this.isBoardLoading.set(false);
            },
          });
        } else {
          this.isBoardLoading.set(false);
        }
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isBoardLoading.set(false);
      },
    });
  }
}
