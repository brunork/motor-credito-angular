import { Injectable } from '@angular/core';
import { signUp, confirmSignUp, signIn, signOut, fetchAuthSession, fetchUserAttributes, resendSignUpCode, AuthSession, SignUpOutput, SignInOutput, ResendSignUpCodeOutput, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.checkSession();
  }

  // Verifica se existe uma sessão válida ao iniciar
  private async checkSession() {
    try {
      const session = await fetchAuthSession();
      this.isAuthenticatedSubject.next(!!session.tokens?.accessToken);
    } catch (error) {
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Cadastro de usuário
  signUp(email: string, password: string): Observable<SignUpOutput> {
    return from(signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email
        }
      }
    }));
  }

  // Confirmação de cadastro com código
  confirmSignUp(email: string, code: string): Observable<any> {
    return from(confirmSignUp({
      username: email,
      confirmationCode: code
    }));
  }

  // Reenviar código de confirmação
  resendSignUpCode(email: string): Observable<ResendSignUpCodeOutput> {
    return from(resendSignUpCode({
      username: email
    }));
  }

  // Login
  signIn(email: string, password: string): Observable<SignInOutput> {
    return from(signIn({
      username: email,
      password
    })).pipe(
      tap(result => {
        if (result.isSignedIn) {
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Logout
  signOut(): Observable<void> {
    return from(signOut()).pipe(
      tap(() => this.isAuthenticatedSubject.next(false))
    );
  }

  // Recuperar sessão atual (inclui tokens)
  getCurrentSession(): Observable<AuthSession> {
    return from(fetchAuthSession());
  }

  // Recuperar apenas o Access Token (para o Interceptor)
  getAccessToken(): Observable<string | undefined> {
    return from(fetchAuthSession()).pipe(
      map(session => session.tokens?.accessToken?.toString()),
      catchError(() => of(undefined))
    );
  }

  // Recuperar atributos do usuário logado
  getUserAttributes(): Observable<FetchUserAttributesOutput> {
    return from(fetchUserAttributes());
  }
  
  // Método auxiliar para verificar síncrono (se já carregou)
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
