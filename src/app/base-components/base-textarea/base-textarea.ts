import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-base-textarea',
  imports: [FormsModule],
  templateUrl: './base-textarea.html',
  styleUrl: './base-textarea.scss',
})
export class BaseTextarea {
  public themeService: ThemeService = inject(ThemeService);

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() error: string = '';
  @Output() handleInputChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public handleValueChange(): void {
    this.handleInputChange.emit(this.value);
  }
}
