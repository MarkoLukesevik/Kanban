import { Component } from '@angular/core';
import {BaseModalComponent} from "../../base-components/base-modal/base-modal.component";

@Component({
  selector: 'app-task-info-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './task-info-modal.component.html',
  styleUrl: './task-info-modal.component.scss',
})
export class TaskInfoModalComponent {}
