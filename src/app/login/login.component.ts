import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;

      this.authService.signIn(email, password).subscribe({
        next: (result) => {
          if (result.isSignedIn) {
            this.router.navigate(['/dashboard']);
          } else {
            // Caso necessite de confirmação ou desafio MFA
            this.errorMessage = 'Login incompleto. Verifique seu status.';
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.isLoading = false;
          switch (err.name) {
            case 'NotAuthorizedException':
              this.errorMessage = 'Usuário ou senha incorretos.';
              break;
            case 'UserNotFoundException':
              this.errorMessage = 'Usuário não encontrado. Verifique o email ou cadastre-se.';
              break;
            case 'UserNotConfirmedException':
              this.errorMessage = 'Usuário não confirmado. Verifique seu email.';
              break;
            case 'LimitExceededException':
              this.errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
              break;
            default:
              this.errorMessage = 'Erro ao realizar login. Tente novamente.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
