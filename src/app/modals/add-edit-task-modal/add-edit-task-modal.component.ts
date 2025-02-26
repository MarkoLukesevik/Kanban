import { Component } from '@angular/core';
import {BaseModalComponent} from "../../base-components/base-modal/base-modal.component";

@Component({
  selector: 'app-add-edit-task-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './add-edit-task-modal.component.html',
  styleUrl: './add-edit-task-modal.component.scss',
})
export class AddEditTaskModalComponent {}
