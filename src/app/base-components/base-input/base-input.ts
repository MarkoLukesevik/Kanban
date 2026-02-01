import { Component, computed, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-input',
  imports: [FormsModule],
  templateUrl: './base-input.html',
  styleUrl: './base-input.scss',
})
export class BaseInput {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() error: string = '';
  @Output() handleInputChange: EventEmitter<string> = new EventEmitter();

  private themeService: ThemeService = inject(ThemeService);

  constructor() {}

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleValueChange(): void {
    this.handleInputChange.emit(this.value);
  }
}
