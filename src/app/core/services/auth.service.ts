import { Injectable, signal } from "@angular/core";

import { LoginRes } from "../LoginRes";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    currentUserSig = signal<LoginRes | undefined | null>(undefined);
    // undefined: initial state
    // null: unauthorized
    // user: logged in

    setCurrentUser(user: LoginRes): void {
        this.currentUserSig.set(user);
      }
    
      clearCurrentUser(): void {
        this.currentUserSig.set(null);
      }
     
      
}