import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import User from '../../models/user';

import LoginUserRequest from '../../requests/user-requests/login-user-request';
import RegisterUserRequest from '../../requests/user-requests/register-user-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly storedUser: User | null = JSON.parse(localStorage.getItem('user') ?? 'null');
  public loggedInUser: WritableSignal<User | null> = signal<User | null>(this.storedUser ?? null);

  constructor(private apiService: ApiService) {}

  public setLoggedInUser(user: User): void {
    this.loggedInUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.loggedInUser.set(null);
  }

  public login(request: LoginUserRequest): Observable<User> {
    return this.apiService.post<User>('login', request);
  }

  public register(request: RegisterUserRequest): Observable<User> {
    return this.apiService.post<User>('register', request);
  }
}
