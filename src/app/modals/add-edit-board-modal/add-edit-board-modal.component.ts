import { Component } from '@angular/core';
import {BaseModalComponent} from "../../base-components/base-modal/base-modal.component";

@Component({
  selector: 'app-add-edit-board-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './add-edit-board-modal.component.html',
  styleUrl: './add-edit-board-modal.component.scss',
})
export class AddEditBoardModalComponent {}
