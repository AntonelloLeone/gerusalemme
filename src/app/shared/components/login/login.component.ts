import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginReq } from '../../../core/LoginReq';
import { LoginRes } from '../../../core/LoginRes';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  });

  onSubmit(): void {
    const loginRequest: LoginReq = this.form.getRawValue();
    console.log(loginRequest);  // Rimuovi in produzione
    this.http.post<LoginRes>(`${environment.apiUrl}Auth/login`, loginRequest)
    .subscribe((response) => {
      console.log('response', response); // Rimuovi in produzione
      localStorage.setItem('token', response.token);
      localStorage.setItem('utente', JSON.stringify(response));
      this.authService.setCurrentUser(response);
      this.router.navigateByUrl('/main');
    }, (error) => {
      console.error('Login error', error);
      this.authService.clearCurrentUser();
    });
  }
}
