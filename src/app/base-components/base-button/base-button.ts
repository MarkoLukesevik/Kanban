import { Component, computed, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-button',
  imports: [],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss',
})
export class BaseButton {
  @Input() text: string = '';
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() isDisabled: boolean = false;
  @Input() isSpinnerOn: boolean = false;
  @Output() handleButtonClick = new EventEmitter();

  private themeService: ThemeService = inject(ThemeService);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );
}
