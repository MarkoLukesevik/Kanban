import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../base-components/base-modal/base-modal.component';

@Component({
  selector: 'app-register-login-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './register-login-modal.component.html',
  styleUrl: './register-login-modal.component.scss',
})
export class RegisterLoginModalComponent implements OnInit {
  public activeView: 'login' | 'register' = 'login';
  constructor() {}

  ngOnInit() {}

  public getModalTitle(): string {
    return this.activeView === 'login' ? 'Login' : 'Register';
  }
}
