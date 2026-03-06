import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditLog, Page, AuditFilter } from './audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  // Assumindo a URL base da API
  private apiUrl = '/api/v1/auditorias';

  constructor(private http: HttpClient) { }

  getAuditLogs(page: number, size: number, filters?: AuditFilter): Observable<Page<AuditLog>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      if (filters.startDate) {
        params = params.set('startDate', filters.startDate);
      }
      if (filters.endDate) {
        params = params.set('endDate', filters.endDate);
      }
      if (filters.tableName) {
        params = params.set('tableName', filters.tableName);
      }
      if (filters.motivoAlteracao) {
        params = params.set('motivoAlteracao', filters.motivoAlteracao);
      }
    }

    return this.http.get<Page<AuditLog>>(this.apiUrl, { params });
  }
}
