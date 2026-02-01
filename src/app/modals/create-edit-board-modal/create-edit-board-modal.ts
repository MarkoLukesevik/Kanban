import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ThemeService } from '../../services/theme-service/theme-service';
import { BoardService } from '../../services/board-service/board-service';
import { ModalService } from '../../services/modal-service/modal-service';
import { ToastrService } from 'ngx-toastr';
import { KanbanService } from '../../services/kanban-service/kanban-service';

import { BaseModal } from '../../base-components/base-modal/base-modal';
import { BaseInput } from '../../base-components/base-input/base-input';

import Board from '../../models/board';
import Kanban from '../../models/kanban';
import Column from '../../models/column';
import EditBoardRequest from '../../requests/board-requests/edit-board-request';
import EditColumnRequest from '../../requests/column-requests/edit-column-request';
import CreateBoardRequest from '../../requests/board-requests/create-board-request';

@Component({
  selector: 'app-create-edit-board-modal',
  imports: [BaseModal, BaseInput],
  templateUrl: './create-edit-board-modal.html',
  styleUrl: './create-edit-board-modal.scss',
})
export class CreateEditBoardModal implements OnInit {
  @Input() board!: Board;

  private themeService: ThemeService = inject(ThemeService);
  private boardService: BoardService = inject(BoardService);
  private modalService: ModalService = inject(ModalService);
  private kanbanService: KanbanService = inject(KanbanService);
  private toastService: ToastrService = inject(ToastrService);

  public currentBoard!: Board;
  private isEditMode: boolean = false;
  public isSaveButtonSpinnerOn: boolean = false;
  public boardNameError: string = '';
  public columnErrors: string[] = [];

  ngOnInit(): void {
    if (this.board) {
      this.isEditMode = true;
      this.currentBoard = structuredClone(this.board);
      this.columnErrors = this.currentBoard.columns.map((): string => '');
    } else {
      this.initializeNewBoard();
    }
  }

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  private initializeNewBoard(): void {
    const kanban: Kanban | null = this.kanbanService.kanbanBoard();
    if (!kanban) return;

    this.currentBoard = {} as Board;
    this.currentBoard.name = '';
    this.currentBoard.kanbanId = kanban.id;
    this.currentBoard.columns = [];
    this.handleAddNewColumn();
  }

  public handleAddNewColumn(): void {
    const column: Partial<Column> = {
      name: '',
      boardId: this.currentBoard.id,
      tasks: [],
    };

    this.currentBoard.columns.push(column as Column);
    this.columnErrors.push('');
  }

  public handleColumnRemove(index: number): void {
    this.currentBoard.columns.splice(index, 1);
    this.columnErrors.splice(index, 1);
  }

  public getModalTitle(): string {
    return this.isEditMode ? 'Edit Board' : 'Create New Board';
  }

  public getSaveButtonName(): string {
    return this.isEditMode ? 'Edit Board' : 'Create Board';
  }

  public handleSaveClick(): void {
    const isBoardValid: boolean = this.validateBoard();
    if (!isBoardValid) return;

    this.isSaveButtonSpinnerOn = true;

    if (this.isEditMode) this.handleEditBoard();
    else this.handleAddBoard();
  }

  private handleAddBoard(): void {
    if (!this.currentBoard) return;

    const addBoardRequest: CreateBoardRequest = {
      kanbanId: this.currentBoard.kanbanId,
      name: this.currentBoard.name,
      columns: this.currentBoard.columns.map((column: Column): string => column.name),
    };

    this.boardService.createBoard(addBoardRequest).subscribe({
      next: (board: Board): void => {
        this.boardService.allBoards.set([...this.boardService.allBoards(), board]);
        this.boardService.selectedBoard.set(board);
        this.modalService.close();
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSaveButtonSpinnerOn = false;
      },
    });
  }

  private handleEditBoard(): void {
    if (!this.currentBoard) return;

    const editBoardColumnsRequest: EditColumnRequest[] = this.currentBoard.columns.map(
      (column: Column): EditColumnRequest => {
        return {
          id: column.id,
          name: column.name,
        };
      },
    );

    const editBoardRequest: EditBoardRequest = {
      id: this.currentBoard.id,
      name: this.currentBoard.name,
      columns: editBoardColumnsRequest,
    };

    this.boardService.editBoard(editBoardRequest).subscribe({
      next: (board: Board): void => {
        this.boardService.selectedBoard.set(board);
        this.modalService.close();
        this.isSaveButtonSpinnerOn = false;
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSaveButtonSpinnerOn = false;
      },
    });
  }

  private validateBoard(): boolean {
    let isBoardValid: boolean = true;

    if (!this.currentBoard.name) {
      this.boardNameError = "Field can't be empty!";
      isBoardValid = false;
    } else this.boardNameError = '';

    this.currentBoard.columns.forEach((column: Column, index: number): void => {
      if (!column.name) {
        this.columnErrors[index] = "Field can't be empty!";
        isBoardValid = false;
      } else this.columnErrors[index] = '';
    });

    return isBoardValid;
  }
}
