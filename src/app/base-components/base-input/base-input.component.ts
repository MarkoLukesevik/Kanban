import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
})
export class BaseInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() error: string = '';

  constructor(public themeService: ThemeService) {}
}
