import { Component } from '@angular/core';
import { BaseModal } from '../../base-components/base-modal/base-modal';

@Component({
  selector: 'app-create-edit-board-modal',
  imports: [BaseModal],
  templateUrl: './create-edit-board-modal.html',
  styleUrl: './create-edit-board-modal.scss',
})
export class CreateEditBoardModal {}
