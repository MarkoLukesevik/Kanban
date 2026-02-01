import { Component, computed, EventEmitter, inject, Output, Signal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';

import { SidebarBoards } from '../sidebar-boards/sidebar-boards';
import { Theme } from '../theme/theme';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarBoards, Theme],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() handleHideSidebar: EventEmitter<void> = new EventEmitter();

  private themeService: ThemeService = inject(ThemeService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );
}
