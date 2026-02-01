import { Component, computed, EventEmitter, inject, Input, Output, Signal } from '@angular/core';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-checkbox',
  imports: [],
  templateUrl: './base-checkbox.html',
  styleUrl: './base-checkbox.scss',
})
export class BaseCheckbox {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Output() handleCheckboxClick: EventEmitter<boolean> = new EventEmitter();

  public themeService: ThemeService = inject(ThemeService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );
}
