import { Component, inject, Input } from '@angular/core';

import { ModalService } from '../../services/modal-service/modal-service';

@Component({
  selector: 'app-base-modal',
  imports: [],
  templateUrl: './base-modal.html',
  styleUrl: './base-modal.scss',
})
export class BaseModal {
  private modalService: ModalService = inject(ModalService);

  @Input() disableClose: boolean = false;

  constructor() {}

  public closeModal(): void {
    if (this.disableClose) return;
    this.modalService.close(null);
  }
}
