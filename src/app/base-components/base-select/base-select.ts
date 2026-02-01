import { Component, computed, EventEmitter, inject, Input, Output, Signal } from '@angular/core';

import { ClickOutsideDirective } from '../../directives/click-outside-directive/click-outside-directive';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-select',
  imports: [ClickOutsideDirective],
  templateUrl: './base-select.html',
  styleUrl: './base-select.scss',
})
export class BaseSelect {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  private themeService: ThemeService = inject(ThemeService);

  public isOpen: boolean = false;

  constructor() {}

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public handleValueChange(option: string): void {
    this.selectedOption = option;
    this.handleChange.emit(this.selectedOption);
    this.isOpen = false;
  }
}
