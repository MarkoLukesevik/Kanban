import { Component } from '@angular/core';
import {BaseModalComponent} from "../../base-components/base-modal/base-modal.component";

@Component({
  selector: 'app-sidebar-popup',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './sidebar-popup.component.html',
  styleUrl: './sidebar-popup.component.scss',
})
export class SidebarPopupComponent {}
