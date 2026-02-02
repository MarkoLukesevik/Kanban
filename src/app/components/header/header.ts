import { Component, computed, inject, Input, Signal } from '@angular/core';

import { ClickOutsideDirective } from '../../directives/click-outside-directive/click-outside-directive';

import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';
import { ModalService } from '../../services/modal-service/modal-service';

import { BaseButton } from '../../base-components/base-button/base-button';

import { SidebarPopup } from '../../modals/sidebar-popup/sidebar-popup';
import { CreateEditTaskModal } from '../../modals/create-edit-task-modal/create-edit-task-modal';
import { CreateEditBoardModal } from '../../modals/create-edit-board-modal/create-edit-board-modal';
import { DeleteBoardModal } from '../../modals/delete-board-modal/delete-board-modal';

import Board from '../../models/board';

@Component({
  selector: 'app-header',
  imports: [ClickOutsideDirective, BaseButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() showBorderUnderLogo: boolean = false;

  private themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private modalService: ModalService = inject(ModalService);

  public isSidebarPopupOpen: boolean = false;
  public isMoreActionsPopupOpen: boolean = false;

  public readonly selectedBoard: Signal<Board | null> = computed((): Board | null => {
    return this.boardService.selectedBoard();
  });

  public readonly selectedBoardName: Signal<string> = computed((): string => {
    const board: Board | null = this.boardService.selectedBoard();
    return board?.name ?? '';
  });

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public openSidebarModal(): void {
    this.isSidebarPopupOpen = true;

    this.modalService
      .open(SidebarPopup)
      .subscribe((): boolean => (this.isSidebarPopupOpen = false));
  }

  public toggleActionsPopup(): void {
    this.isMoreActionsPopupOpen = !this.isMoreActionsPopupOpen;
  }

  public closeActionsPopup(): void {
    this.isMoreActionsPopupOpen = false;
  }

  public handleAddNewTask(): void {
    this.modalService.open(CreateEditTaskModal);
  }

  public handleEditBoardClick(): void {
    this.modalService.open(CreateEditBoardModal, { board: this.boardService.selectedBoard() });
  }

  public handleDeleteBoardClick(): void {
    this.modalService.open(DeleteBoardModal, { board: this.boardService.selectedBoard() });
  }
}
