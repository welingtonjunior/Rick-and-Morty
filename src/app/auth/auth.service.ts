import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  constructor() {}

  authenticate(username: string, password: string): boolean {
    if (username === 'WelingtonJunior' && password === 'W1234') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
