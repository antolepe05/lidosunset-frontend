import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor funzionale che aggiunge automaticamente il token JWT a ogni
// richiesta HTTP in uscita, leggendolo da AuthService invece che
// direttamente da localStorage - un solo punto del progetto sa come e dove
// è salvato il token, eliminando il rischio che questo file e AuthService
// si disallineino se la chiave di localStorage cambiasse in futuro.

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();// o 'jwt_token', usa la tua chiave

  // 2. Se il token esiste, clona la richiesta e aggiungi l'header Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 3. Se non c'è il token, lascia passare la richiesta normale (es. durante il login)
  return next(req);
};
