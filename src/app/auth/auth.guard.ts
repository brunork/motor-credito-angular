import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { fetchAuthSession } from 'aws-amplify/auth';
import { from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return from(fetchAuthSession()).pipe(
    map(session => {
      if (session.tokens?.accessToken) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
