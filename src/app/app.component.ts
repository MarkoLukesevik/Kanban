import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { KanbanService } from './services/kanban.service';
import { BoardService } from './services/board.service';
import { ThemeService } from './services/theme.service';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';

import User from './models/user';
import Board from './models/board';
import Kanban from './models/kanban';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardPresenterComponent } from './components/board-presenter/board-presenter.component';
import { RegisterLoginModalComponent } from './modals/register-login-modal/register-login-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SidebarComponent, HeaderComponent, BoardPresenterComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private kanbanService: KanbanService,
    private boardService: BoardService,
    private toastService: ToastrService,
    private userService: UserService,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    const user: User | null = this.userService.getLoggedInUser()();
    if (user) this.getKanbanForUser(user.id);
    else
      this.modalService
        .open(RegisterLoginModalComponent)
        .subscribe((user: User) => this.getKanbanForUser(user.id));
  }

  private getKanbanForUser(userId: string): void {
    this.kanbanService.getKanbanForUser(userId).subscribe({
      next: (kanban: Kanban): void => {
        this.kanbanService.setKanban(kanban);
        if (kanban.boards.length > 0) {
          this.boardService.setAllBoards(kanban.boards);
          this.boardService.getBoardById(kanban.boards[0].id).subscribe({
            next: (board: Board): void =>
              this.boardService.setSelectedBoard(board),
            error: (httpErrorResponse: HttpErrorResponse) =>
              this.toastService.error(httpErrorResponse.error.error),
          });
        }
      },
      error: (httpErrorResponse: HttpErrorResponse) =>
        this.toastService.error(httpErrorResponse.error.error),
    });
  }
}
