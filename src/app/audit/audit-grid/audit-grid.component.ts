import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuditService } from '../audit.service';
import { AuditLog, Page } from '../audit.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-audit-grid',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, DatePipe],
  templateUrl: './audit-grid.component.html',
  styleUrl: './audit-grid.component.css'
})
export class AuditGridComponent implements OnInit {

  auditLogs: AuditLog[] = [];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  loading = false;

  filterForm: FormGroup;

  constructor(
    private auditService: AuditService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      tableName: [''],
      motivoAlteracao: ['']
    });
  }

  ngOnInit(): void {
    try {
      this.loadLogs();
    } catch (e) {
      console.error('Error in ngOnInit', e);
    }
  }

  loadLogs(): void {
    this.loading = true;
    try {
      const filters = this.filterForm.value;
      
      this.auditService.getAuditLogs(this.currentPage, this.pageSize, {
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        tableName: filters.tableName || undefined,
        motivoAlteracao: filters.motivoAlteracao || undefined
      }).subscribe({
        next: (page: Page<AuditLog>) => {
          this.auditLogs = page.content;
          this.totalElements = page.totalElements;
          this.totalPages = page.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar logs de auditoria', err);
          this.loading = false;
        }
      });
    } catch (e) {
      console.error('Error loading logs', e);
      this.loading = false;
    }
  }

  onFilterSubmit(): void {
    this.currentPage = 0; // Reset para primeira página ao filtrar
    this.loadLogs();
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadLogs();
    }
  }

  getPagesArray(): number[] {
    // Retorna array de páginas para exibir na paginação simples
    // Pode ser melhorado para mostrar apenas range próximo
    const maxPagesToShow = 5;
    const startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow);
    
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }

  // Helper para formatar valor se for nulo ou vazio
  formatValue(value: string): string {
    return value ? value : '-';
  }
}
