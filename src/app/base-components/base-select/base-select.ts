import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { ClickOutsideDirective } from '../../directives/click-outside-directive/click-outside-directive';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-select',
  imports: [ClickOutsideDirective],
  templateUrl: './base-select.html',
  styleUrl: './base-select.scss',
})
export class BaseSelect {
  public themeService: ThemeService = inject(ThemeService);

  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  public isOpen: boolean = false;

  constructor() {}

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public handleValueChange(option: string): void {
    this.selectedOption = option;
    this.handleChange.emit(this.selectedOption);
    this.isOpen = false;
  }
}
