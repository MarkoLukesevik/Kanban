import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';

import User from '../../models/user';

import { BaseModalComponent } from '../../base-components/base-modal/base-modal.component';
import { BaseInputComponent } from '../../base-components/base-input/base-input.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../../services/modal.service';
import RegisterUserRequest from '../../requests/user-requests/register-user-request';

@Component({
  selector: 'app-register-login-modal',
  standalone: true,
  imports: [BaseModalComponent, BaseInputComponent, CommonModule],
  templateUrl: './register-login-modal.component.html',
  styleUrl: './register-login-modal.component.scss',
})
export class RegisterLoginModalComponent {
  public activeView: 'login' | 'register' = 'login';

  public name: string = '';
  public lastName: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';

  public emailError: string = '';
  public passwordError: string = '';

  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private modalService: ModalService,
    public themeService: ThemeService,
  ) {}

  // region view actions and formatters
  public getTextBasedOnActiveView(): string {
    return this.activeView === 'login' ? 'Login' : 'Register';
  }

  public toggleActiveView() {
    this.resetUser();
    if (this.activeView === 'login') this.activeView = 'register';
    else this.activeView = 'login';
  }

  public getActiveViewToggleButtonText() {
    if (this.activeView === 'register')
      return 'Already have an account? Click here to login.';
    return "Don't have an account? Click here to register.";
  }

  public isFooterButtonDisabled(): boolean {
    if (this.activeView === 'login') return !this.username || !this.password;

    return (
      !this.name ||
      !this.lastName ||
      !this.username ||
      !this.email ||
      !this.password
    );
  }

  public handleFooterButtonClick() {
    if (this.activeView === 'register') this.handleRegister();
    else this.handleLogin();
  }

  // endregion

  // region handlers
  private resetUser(): void {
    this.name = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }

  private handleRegister(): void {
    this.validateEmail();
    this.validatePassword();

    if (this.emailError || this.passwordError) return;

    const request: RegisterUserRequest = {
      name: this.name,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.userService.register(request).subscribe({
      next: (): void => {
        this.toggleActiveView();
        this.toastService.success('Account successfully registered!');
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        this.toastService.error(httpErrorResponse.error.error);
      },
    });
  }

  private handleLogin(): void {
    this.userService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (user: User): void => {
          this.userService.setLoggedInUser(user);
          this.modalService.close(user);
        },
        error: (httpErrorResponse: HttpErrorResponse) => {
          this.toastService.error(httpErrorResponse.error.error);
        },
      });
  }
  // endregion

  // region validation
  private validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.emailError = 'Invalid email format.';
      return false;
    }

    this.emailError = '';
    return true;
  }

  private validatePassword(): boolean {
    if (this.password.length < 6) {
      this.passwordError = 'Password must have at least 6 characters.';
      return false;
    }

    if (!/\d/.test(this.password)) {
      this.passwordError = 'Password must have at least 1 number.';
      return false;
    }

    this.passwordError = '';
    return true;
  }
  // endregion
}
