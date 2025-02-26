import { Component } from '@angular/core';
import {BaseModalComponent} from "../../base-components/base-modal/base-modal.component";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {}
