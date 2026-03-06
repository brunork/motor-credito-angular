import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewSimulationComponent } from './new-simulation/new-simulation.component';
import { AuditGridComponent } from './audit/audit-grid/audit-grid.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: SignupComponent },
  { path: 'recuperar-senha', component: ForgotPasswordComponent },
  { 
    path: 'dashboard', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'auditoria', component: AuditGridComponent },
      { path: '', component: DashboardComponent },
      { path: 'nova-simulacao', component: NewSimulationComponent }
    ]
  }
];
