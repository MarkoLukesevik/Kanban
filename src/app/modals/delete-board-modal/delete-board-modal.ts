import { Component, computed, inject, Input, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';

import { BaseModal } from '../../base-components/base-modal/base-modal';
import { BaseButton } from '../../base-components/base-button/base-button';

import Board from '../../models/board';

@Component({
  selector: 'app-delete-board-modal',
  imports: [BaseModal, BaseButton],
  templateUrl: './delete-board-modal.html',
  styleUrl: './delete-board-modal.scss',
})
export class DeleteBoardModal {
  @Input() board!: Board;

  public isDeleteButtonSpinnerOn: boolean = false;

  private themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleDeleteClick(): void {
    this.isDeleteButtonSpinnerOn = true;
    this.boardService.deleteBoard(this.board.id).subscribe({
      next: (): void => {
        const filteredBoards: Board[] = this.boardService
          .allBoards()
          .filter((board: Board) => board.id !== this.board.id);
        this.boardService.allBoards.set(filteredBoards);
        if (this.boardService.allBoards().length > 0) {
          this.boardService.selectedBoard.set(this.boardService.allBoards()[0]);
        } else {
          this.boardService.selectedBoard.set(null);
        }
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
