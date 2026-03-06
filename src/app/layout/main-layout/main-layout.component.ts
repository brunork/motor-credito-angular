import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Building, 
  Settings, 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronRight,
  User,
  LogOut,
  History
} from 'lucide-angular';

const ICONS = {
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Building, 
  Settings, 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronRight,
  User,
  LogOut,
  History
};

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // User info
  userName: string = 'Carregando...';
  isProfileDropdownOpen: boolean = false;

  readonly icons = ICONS;

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getUserAttributes().subscribe({
      next: (attributes) => {
        this.userName = attributes.name || attributes.email || 'Usuário';
      },
      error: (err) => {
        console.error('Erro ao carregar perfil:', err);
        this.userName = 'Usuário';
      }
    });
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  editProfile() {
    console.log('Editar perfil');
    this.isProfileDropdownOpen = false;
  }

  settings() {
    console.log('Configurações');
    this.isProfileDropdownOpen = false;
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
