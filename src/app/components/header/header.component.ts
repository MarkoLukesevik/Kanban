import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService } from '../../services/board.service';
import { ModalService } from '../../services/modal.service';
import { ThemeService } from '../../services/theme.service';
import { SidebarPopupComponent } from '../../modals/sidebar-popup/sidebar-popup.component';
import { ClickOutsideDirective } from '../../directives/click-outside-directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isSidebarPopupOpen = false;
  public isMoreActionsPopupOpen = false;

  constructor(
    private boardService: BoardService,
    private modalService: ModalService,
    public themeService: ThemeService,
  ) {}

  public getSelectedBoardName(): string {
    const board = this.boardService.getBoard()();
    return board ? board.name : '';
  }

  public openSidebarModal(): void {
    this.isSidebarPopupOpen = true;

    this.modalService
      .open(SidebarPopupComponent)
      .subscribe(() => (this.isSidebarPopupOpen = false));
  }

  public toggleActionsPopup(): void {
    this.isMoreActionsPopupOpen = !this.isMoreActionsPopupOpen;
  }

  public closeActionsPopup(): void {
    this.isMoreActionsPopupOpen = false;
  }

  public handleAddNewBoardClick(): void {}

  public handleDeleteBoardClick(): void {}
}
