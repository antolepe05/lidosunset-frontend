import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Login: prerenderizzato (pagina pubblica, nessun dato dinamico)
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },

  // Dashboard e tutte le route protette: solo client-side.
  // Il server non ha accesso a localStorage quindi non può
  // aggiungere il token JWT alle richieste HTTP.
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
