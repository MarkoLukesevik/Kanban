import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import User from '../models/user';
import LoginUserRequest from '../requests/user-requests/login-user-request';
import RegisterUserRequest from '../requests/user-requests/register-user-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUser = signal<User | null>(null);

  constructor(private apiService: ApiService) {}

  public getLoggedInUser(): Signal<User | null> {
    return this.loggedInUser;
  }

  public setLoggedInUser(user: User): void {
    this.loggedInUser.set(user);
  }

  public login(request: LoginUserRequest): Observable<User> {
    return this.apiService.post<User>('login', request);
  }

  public register(request: RegisterUserRequest): Observable<User> {
    return this.apiService.post<User>('register', request);
  }
}
