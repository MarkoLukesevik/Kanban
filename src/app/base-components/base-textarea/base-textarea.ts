import { Component, computed, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-textarea',
  imports: [FormsModule],
  templateUrl: './base-textarea.html',
  styleUrl: './base-textarea.scss',
})
export class BaseTextarea {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() error: string = '';
  @Output() handleInputChange: EventEmitter<string> = new EventEmitter();

  public themeService: ThemeService = inject(ThemeService);

  constructor() {}

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public handleValueChange(): void {
    this.handleInputChange.emit(this.value);
  }
}
