import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { concatMap } from 'rxjs';
import { KanbanService } from './services/kanban.service';
import User from './models/user';
import { BoardService } from './services/board.service';
import Board from './models/board';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardPresenterComponent } from './components/board-presenter/board-presenter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SidebarComponent, HeaderComponent, BoardPresenterComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private kanbanService: KanbanService,
    private boardService: BoardService,
    private toastService: ToastrService,
  ) {}

  ngOnInit() {
    this.userService
      .login({ username: 'Markox998', password: 'Sarkomarko1' })
      .pipe(
        concatMap((user: User) => {
          this.userService.setLoggedInUser(user);
          return this.kanbanService.getKanbanForUser(user.id);
        }),
      )
      .subscribe({
        next: (kanban) => {
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
