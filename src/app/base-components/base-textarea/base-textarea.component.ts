import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-base-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-textarea.component.html',
  styleUrl: './base-textarea.component.scss',
})
export class BaseTextareaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() error: string = '';
  @Output() handleInputChange: EventEmitter<string> = new EventEmitter();

  constructor(public themeService: ThemeService) {}

  handleValueChange() {
    this.handleInputChange.emit(this.value);
  }
}
