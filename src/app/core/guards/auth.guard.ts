import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard funzionale che protegge le route che richiedono autenticazione.
// Se l'utente non è loggato, viene reindirizzato alla pagina di login.
// Viene utilizzato su quasi tutte le route in app.route.ts con canActivate
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Utente non autenticato: reindirizza al login
  router.navigate(['/login']);
  return false;
};
