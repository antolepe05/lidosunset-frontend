import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor JWT effettivamente registrato in app.config.ts. Aggiunge l'header Authorization a ogni
// richiesta HTTP in uscita, leggendo il token tramite AuthService.getToken()
// invece di accedere direttamente a localStorage

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Se il token esiste, clona la richiesta e aggiungi l'header Authorization
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  // Se non c'è il token, lascia passare la richiesta normale (es. durante il login)
  return next(req);
};
