import { Component, inject } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';

import { BaseModal } from '../../base-components/base-modal/base-modal';

import { Theme } from '../../components/theme/theme';
import { SidebarBoards } from '../../components/sidebar-boards/sidebar-boards';

@Component({
  selector: 'app-sidebar-popup',
  imports: [BaseModal, SidebarBoards, Theme],
  templateUrl: './sidebar-popup.html',
  styleUrl: './sidebar-popup.scss',
})
export class SidebarPopup {
  public themeService: ThemeService = inject(ThemeService);
}
