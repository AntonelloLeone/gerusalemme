import { Injectable, signal } from '@angular/core';

import { LoginRes } from '../LoginRes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<LoginRes | undefined | null>(undefined);
  // undefined: initial state
  // null: unauthorized
  // user: logged in

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  setCurrentUser(user: LoginRes): void {
    this.currentUserSig.set(user);
    console.log(user);
  }

  clearCurrentUser(): void {
    this.currentUserSig.set(null);
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('utente');
    if (userJson) {
      try {
        const user = JSON.parse(userJson) as LoginRes;
        this.currentUserSig.set(user);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        this.clearCurrentUser(); // Pulisci in caso di errore nel parsing
      }
    } else {
      this.currentUserSig.set(null);
    }
  }
}
