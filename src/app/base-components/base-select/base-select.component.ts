import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme.service';
import { ClickOutsideDirective } from '../../directives/click-outside-directive';

@Component({
  selector: 'app-base-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './base-select.component.html',
  styleUrl: './base-select.component.scss',
})
export class BaseSelectComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  public isOpen: boolean = false;

  constructor(public themeService: ThemeService) {}

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public handleValueChange(option: string): void {
    this.selectedOption = option;
    this.handleChange.emit(this.selectedOption);
    this.isOpen = false;
  }
}
