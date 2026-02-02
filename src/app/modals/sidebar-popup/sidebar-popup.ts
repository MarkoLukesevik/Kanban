import { Component, computed, inject, Signal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';

import { BaseModal } from '../../base-components/base-modal/base-modal';

import { Theme } from '../../components/theme/theme';
import { SidebarBoards } from '../../components/sidebar-boards/sidebar-boards';
import { UserService } from '../../services/user-service/user-service';
import User from '../../models/user';

@Component({
  selector: 'app-sidebar-popup',
  imports: [BaseModal, SidebarBoards, Theme],
  templateUrl: './sidebar-popup.html',
  styleUrl: './sidebar-popup.scss',
})
export class SidebarPopup {
  private themeService: ThemeService = inject(ThemeService);
  private userService: UserService = inject(UserService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public loggedInUser: Signal<User | null> = computed((): User | null =>
    this.userService.loggedInUser(),
  );

  public handleLogoutClick(): void {
    this.userService.logout();
  }
}
