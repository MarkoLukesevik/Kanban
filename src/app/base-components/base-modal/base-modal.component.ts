import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss',
})
export class BaseModalComponent {
  @Input() disableClose: boolean = false;

  constructor(private modalService: ModalService) {}

  public closeModal(): void {
    if (this.disableClose) return;
    this.modalService.close(null);
  }
}
