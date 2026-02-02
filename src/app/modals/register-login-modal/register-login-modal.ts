import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme-service/theme-service';
import { UserService } from '../../services/user-service/user-service';
import { ModalService } from '../../services/modal-service/modal-service';

import { BaseModal } from '../../base-components/base-modal/base-modal';
import { BaseInput } from '../../base-components/base-input/base-input';
import { BaseButton } from '../../base-components/base-button/base-button';

import User from '../../models/user';

import RegisterUserRequest from '../../requests/user-requests/register-user-request';

@Component({
  selector: 'app-register-login-modal',
  imports: [BaseModal, BaseInput, BaseButton],
  templateUrl: './register-login-modal.html',
  styleUrl: './register-login-modal.scss',
})
export class RegisterLoginModal {
  private themeService: ThemeService = inject(ThemeService);
  private userService: UserService = inject(UserService);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastrService = inject(ToastrService);

  public activeView: 'login' | 'register' = 'login';

  public name: string = '';
  public lastName: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';

  public emailError: string = '';
  public passwordError: string = '';

  public isSubmitButtonSpinnerOn: WritableSignal<boolean> = signal(false);

  public isDark: Signal<boolean> = computed(
    (): boolean => this.themeService.currentTheme() === 'dark',
  );

  // region view actions and formatters
  public getTextBasedOnActiveView(): string {
    return this.activeView === 'login' ? 'Login' : 'Register';
  }

  public toggleActiveView(): void {
    this.resetUser();
    if (this.activeView === 'login') this.activeView = 'register';
    else this.activeView = 'login';
  }

  public getActiveViewToggleButtonText(): string {
    if (this.activeView === 'register') return 'Already have an account? Click here to login.';
    return "Don't have an account? Click here to register.";
  }

  public isFooterButtonDisabled(): boolean {
    if (this.activeView === 'login') return !this.username || !this.password;

    return !this.name || !this.lastName || !this.username || !this.email || !this.password;
  }

  public handleFooterButtonClick(): void {
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

    this.isSubmitButtonSpinnerOn.set(true);
    this.userService.register(request).subscribe({
      next: (): void => {
        this.toggleActiveView();
        this.isSubmitButtonSpinnerOn.set(false);
        this.toastService.success('Account successfully registered!');
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSubmitButtonSpinnerOn.set(false);
      },
    });
  }

  private handleLogin(): void {
    this.isSubmitButtonSpinnerOn.set(true);
    this.userService.login({ username: this.username, password: this.password }).subscribe({
      next: (user: User): void => {
        this.userService.setLoggedInUser(user);
        this.isSubmitButtonSpinnerOn.set(false);
        this.modalService.close(user);
      },
      error: (httpErrorResponse: HttpErrorResponse): void => {
        this.toastService.error(httpErrorResponse.error.error);
        this.isSubmitButtonSpinnerOn.set(false);
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
