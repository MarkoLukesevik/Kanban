import { Component } from '@angular/core';

import { ThemeService } from '../../services/theme.service';

import { BaseModalComponent } from '../../base-components/base-modal/base-modal.component';
import { SidebarBoardsComponent } from '../../components/sidebar-boards/sidebar-boards.component';
import { ThemeComponent } from '../../components/theme/theme.component';

@Component({
  selector: 'app-sidebar-popup',
  standalone: true,
  imports: [BaseModalComponent, SidebarBoardsComponent, ThemeComponent],
  templateUrl: './sidebar-popup.component.html',
  styleUrl: './sidebar-popup.component.scss',
})
export class SidebarPopupComponent {
  constructor(public themeService: ThemeService) {}
}
