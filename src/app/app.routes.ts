import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: SignupComponent },
  { path: 'recuperar-senha', component: ForgotPasswordComponent }
];
