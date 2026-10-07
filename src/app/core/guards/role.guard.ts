import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard funzionale che protegge le route in base al ruolo dell'utente.
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Legge i ruoli permessi dalla configurazione della route
  const allowedRoles: string[] = route.data?.['roles'] ?? [];
  const userRole = authService.getRole();

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  // Ruolo non autorizzato: reindirizza alla home
  router.navigate(['/']);
  return false;
};
