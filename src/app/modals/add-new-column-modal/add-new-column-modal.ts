import { Component, computed, inject, Signal } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal-service';
import { BaseModal } from '../../base-components/base-modal/base-modal';
import { BaseInput } from '../../base-components/base-input/base-input';
import { BoardService } from '../../services/board-service/board-service';
import Column from '../../models/column';
import { ThemeService } from '../../services/theme-service/theme-service';
import Board from '../../models/board';
import EditBoardRequest from '../../requests/board-requests/edit-board-request';
import CreateColumnRequest from '../../requests/column-requests/create-column-request';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ColumnService } from '../../services/column-service/column-service';

@Component({
  selector: 'app-add-new-column-modal',
  imports: [BaseModal, BaseInput],
  templateUrl: './add-new-column-modal.html',
  styleUrl: './add-new-column-modal.scss',
})
export class AddNewColumnModal {
  public themeService: ThemeService = inject(ThemeService);
  private modalService: ModalService = inject(ModalService);
  private boardService: BoardService = inject(BoardService);
  private columnService: ColumnService = inject(ColumnService);
  private toastService: ToastrService = inject(ToastrService);

  public isAddColumnButtonSpinnerOn: boolean = false;
  public columnName: string = '';
  public columnNameError: string = '';

  public selectedBoard: Board | null = this.boardService.selectedBoard();

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleColumnNameChange(columnName: string) {
    this.columnName = columnName;
  }

  public handleAddColumnClick(): void {
    if (!this.selectedBoard || this.isAddColumnButtonSpinnerOn) return;

    this.isAddColumnButtonSpinnerOn = true;

    const existingColumnNamesInBoard: string[] = this.boardService
      .selectedBoardColumns()
      .map((column: Column): string => column.name.toLowerCase());

    if (existingColumnNamesInBoard.includes(this.columnName.toLowerCase())) {
      this.columnNameError = 'Column name already exists!';
      this.isAddColumnButtonSpinnerOn = false;
      return;
    } else {
      this.columnNameError = '';
    }

    const createColumnRequest: CreateColumnRequest = {
      boardId: this.selectedBoard.id,
      name: this.columnName,
    };

    this.columnService.createColumn(createColumnRequest).subscribe({
      next: (column: Column): void => {
        this.boardService.addColumnToSelectedBoard(column);
        this.isAddColumnButtonSpinnerOn = false;
        this.modalService.close();
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isAddColumnButtonSpinnerOn = false;
      },
    });
  }
}
