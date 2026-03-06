import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { fetchAuthSession } from 'aws-amplify/auth';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Define quais rotas devem ser interceptadas (ex: /api)
  // Se for uma requisição para a API, adiciona o token
  // Aqui assumimos que todas as requisições para o backend precisam de token
  // Pode ajustar o filtro conforme necessário (ex: req.url.includes('/api'))
  
  // Vamos interceptar tudo, exceto talvez login/signup se for para backend próprio
  // Mas como estamos usando Cognito diretamente para Auth, as requisições de negócio vão para API Gateway/Backend
  
  // O fetchAuthSession já lida com refresh de token se necessário
  return from(fetchAuthSession()).pipe(
    switchMap(session => {
      const token = session.tokens?.accessToken?.toString();
      
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      }
      
      return next(req);
    })
  );
};
