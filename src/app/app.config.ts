import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { authInterceptor } from './auth/auth.interceptor';
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
  Download, 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  BarChart2, 
  UserPlus, 
  Calendar, 
  MoreHorizontal, 
  MoreVertical,
  ChevronRight,
  User,
  LogOut
} from 'lucide-angular';

import { routes } from './app.routes';

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
  Download, 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  BarChart2, 
  UserPlus, 
  Calendar, 
  MoreHorizontal, 
  MoreVertical,
  ChevronRight,
  User,
  LogOut
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(LucideAngularModule.pick(ICONS))
  ]
};
