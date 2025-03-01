import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { KanbanService } from './services/kanban.service';
import { BoardService } from './services/board.service';
import { ThemeService } from './services/theme.service';
import { ModalService } from './services/modal.service';

import User from './models/user';
import Board from './models/board';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardPresenterComponent } from './components/board-presenter/board-presenter.component';
import { RegisterLoginModalComponent } from './modals/register-login-modal/register-login-modal.component';
import Kanban from './models/kanban';

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
    public themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.modalService
      .open(RegisterLoginModalComponent)
      .subscribe((user: User) => {
        this.getKanbanForUser(user.id);
      });
  }

  private getKanbanForUser(userId: string) {
    this.kanbanService.getKanbanForUser(userId).subscribe({
      next: (kanban: Kanban) => {
        this.kanbanService.setkanban(kanban);
        if (kanban.boards.length > 0) {
          this.boardService.getBoardById(kanban.boards[0].id).subscribe({
            next: (board: Board) => {
              this.boardService.setBoard(board);
            },
            error: (error: Error) => {
              this.toastService.error(error.message);
            },
          });
        }
      },
      error: (error: Error) => {
        this.toastService.error(error.message);
      },
    });
  }
}
