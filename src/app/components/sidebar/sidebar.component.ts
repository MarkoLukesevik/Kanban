import { Component, EventEmitter, Output } from '@angular/core';

import { ThemeService } from '../../services/theme.service';

import { SidebarBoardsComponent } from '../sidebar-boards/sidebar-boards.component';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarBoardsComponent, ThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() handleHideSidebar: EventEmitter<void> = new EventEmitter();

  constructor(public themeService: ThemeService) {}
}
