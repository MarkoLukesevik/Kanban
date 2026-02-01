import { Component, computed, inject, Signal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.scss',
})
export class Theme {
  public themeService: ThemeService = inject(ThemeService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );
}
