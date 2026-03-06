import { Component, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  showPassword = false;
  showConfirmPassword = false;
  showConfirmation = false;
  
  signupForm: FormGroup;
  confirmationForm: FormGroup;
  
  errorMessage = '';
  isLoading = false;
  emailToConfirm = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private cd = inject(ChangeDetectorRef);

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    this.confirmationForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.signupForm.value;
      this.emailToConfirm = email;

      this.authService.signUp(email, password).subscribe({
        next: (result) => {
          this.ngZone.run(() => {
            this.isLoading = false;
            // Se o cadastro não estiver completo, exibe a tela de confirmação
            if (!result.isSignUpComplete) {
              this.showConfirmation = true;
            } else {
              // Se já estiver completo (caso raro com email verification), vai para login
              this.router.navigate(['/login']);
            }
            this.cd.detectChanges();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Erro no cadastro:', err);
            this.isLoading = false;
            
            // Tratamento de erros específicos do Cognito
            switch (err.name) {
              case 'UsernameExistsException':
                // Se o usuário já existe, tentamos reenviar o código para verificar se está pendente de confirmação
                this.handleExistingUser(email);
                break;
              case 'InvalidPasswordException':
                this.errorMessage = 'A senha deve ter no mínimo 8 caracteres, conter letras maiúsculas, minúsculas, números e símbolos.';
                break;
              case 'InvalidParameterException':
                this.errorMessage = 'Verifique se o email está no formato correto.';
                break;
              case 'CodeDeliveryFailureException':
                this.errorMessage = 'Falha ao enviar o código de verificação. Tente novamente.';
                break;
              default:
                this.errorMessage = err.message || 'Erro ao realizar cadastro. Verifique os dados.';
            }
            this.cd.detectChanges();
          });
        }
      });
    }
  }

  // Tenta reenviar o código se o usuário já existir. 
  // Se conseguir reenviar, significa que o usuário não está confirmado -> exibe tela de confirmação.
  // Se falhar, assume que já está confirmado ou outro erro -> exibe erro padrão.
  private handleExistingUser(email: string) {
    this.isLoading = true;
    this.authService.resendSignUpCode(email).subscribe({
      next: (result) => {
        this.ngZone.run(() => {
          this.isLoading = false;
          this.showConfirmation = true;
          this.errorMessage = `Este email já foi cadastrado mas não confirmado. Enviamos um novo código para ${result.destination}.`;
          this.cd.detectChanges();
        });
      },
      error: (resendErr) => {
        this.ngZone.run(() => {
          this.isLoading = false;
          console.error('Erro ao reenviar código para usuário existente:', resendErr);
          this.errorMessage = 'Este email já está cadastrado. Faça login ou recupere sua senha.';
          this.cd.detectChanges();
        });
      }
    });
  }

  onResendCode() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.resendSignUpCode(this.emailToConfirm).subscribe({
      next: (result) => {
        this.isLoading = false;
        alert(`Código reenviado com sucesso para ${result.destination}!`);
      },
      error: (err) => {
        console.error('Erro ao reenviar código:', err);
        this.isLoading = false;
        this.errorMessage = 'Erro ao reenviar código. Tente novamente em alguns instantes.';
      }
    });
  }

  onConfirm() {
    if (this.confirmationForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { code } = this.confirmationForm.value;

      this.authService.confirmSignUp(this.emailToConfirm, code).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Cadastro confirmado com sucesso! Faça login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro na confirmação:', err);
          this.isLoading = false;
          this.errorMessage = 'Código inválido ou expirado.';
        }
      });
    }
  }
}
