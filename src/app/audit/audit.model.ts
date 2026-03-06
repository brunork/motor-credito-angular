export interface AuditLog {
  idLog: number;
  idUsuarioResponsavel: string;
  tabelaAfetada: string;
  campoAfetado: string;
  valorAnterior: string;
  valorNovo: string;
  dataAlteracao: string;
  usuarioNome?: string;
  usuarioEmail?: string;
  motivoAlteracao?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AuditFilter {
  startDate?: string;
  endDate?: string;
  tableName?: string;
  motivoAlteracao?: string;
}
