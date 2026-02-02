import { Component, computed, EventEmitter, inject, Output, Signal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';
import { UserService } from '../../services/user-service/user-service';

import { SidebarBoards } from '../sidebar-boards/sidebar-boards';
import { Theme } from '../theme/theme';

import User from '../../models/user';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarBoards, Theme],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() handleHideSidebar: EventEmitter<void> = new EventEmitter();

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
