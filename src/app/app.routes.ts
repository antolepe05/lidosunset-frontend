import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'istruttore',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/istruttore/home-istruttore/home-istruttore').then(m => m.HomeIstruttore)
  },
  {
    path: 'prenotazioni',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/prenotazioni/lista-prenotazioni/lista-prenotazioni').then(m => m.ListaPrenotazioni)
  },
  {
    path: 'prenotazioni/nuova',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/prenotazioni/nuova-prenotazione/nuova-prenotazione').then(m => m.NuovaPrenotazione)
  },
  {
    path: 'prenotazioni/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/prenotazioni/nuova-prenotazione/nuova-prenotazione').then(m => m.NuovaPrenotazione)
  },
  {
    path: 'prenotazioni/restituzione/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/prenotazioni/restituzione-prenotazione/restituzione-prenotazione').then(m => m.RestituzionePrenotazione)
  },
  {
    path: 'attrezzature',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/attrezzature/lista-attrezzature/lista-attrezzature').then(m => m.ListaAttrezzature)
  },
  {
    path: 'attrezzature/nuova',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/attrezzature/form-attrezzatura/form-attrezzatura').then(m => m.FormAttrezzatura)
  },
  {
    path: 'attrezzature/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/attrezzature/form-attrezzatura/form-attrezzatura').then(m => m.FormAttrezzatura)
  },
  {
    path: 'manutenzioni',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/manutenzioni/lista-manutenzioni/lista-manutenzioni').then(m => m.ListaManutenzioni)
  },
  {
    path: 'manutenzioni/nuova',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/manutenzioni/form-manutenzione/form-manutenzione').then(m => m.FormManutenzione)
  },
  {
    path: 'manutenzioni/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/manutenzioni/form-manutenzione/form-manutenzione').then(m => m.FormManutenzione)
  },
  {
    path: 'fornitori',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/fornitori/lista-fornitori/lista-fornitori').then(m => m.ListaFornitori)
  },
  {
    path: 'fornitori/nuovo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/fornitori/form-fornitore/form-fornitore').then(m => m.FormFornitore)
  },
  {
    path: 'fornitori/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/fornitori/form-fornitore/form-fornitore').then(m => m.FormFornitore)
  },
  {
    path: 'clienti',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/clienti/lista-clienti/lista-clienti').then(m => m.ListaClienti)
  },
  {
    path: 'clienti/nuovo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/clienti/form-cliente/form-cliente').then(m => m.FormCliente)
  },
  {
    path: 'clienti/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/clienti/form-cliente/form-cliente').then(m => m.FormCliente)
  },
  {
    path: 'acquisti-attrezzature',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/lista-acquisti-attrezzature/lista-acquisti-attrezzature').then(m => m.ListaAcquistiAttrezzature)
  },
  {
    path: 'acquisti-attrezzature/nuovo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/form-acquisto-attrezzatura/form-acquisto-attrezzatura').then(m => m.FormAcquistoAttrezzatura)
  },
  {
    path: 'acquisti-attrezzature/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/form-acquisto-attrezzatura/form-acquisto-attrezzatura').then(m => m.FormAcquistoAttrezzatura)
  },
  {
    path: 'acquisti-ristorante',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/lista-acquisti-ristorante/lista-acquisti-ristorante').then(m => m.ListaAcquistiRistorante)
  },
  {
    path: 'acquisti-ristorante/nuovo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/form-acquisto-ristorante/form-acquisto-ristorante').then(m => m.FormAcquistoRistorante)
  },
  {
    path: 'acquisti-ristorante/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/acquisti/form-acquisto-ristorante/form-acquisto-ristorante').then(m => m.FormAcquistoRistorante)
  },
  {
    path: 'vendite-ristorante',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/vendite/lista-vendite-ristorante/lista-vendite-ristorante').then(m => m.ListaVenditeRistorante)
  },
  {
    path: 'vendite-ristorante/nuova',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/vendite/form-vendita-ristorante/form-vendita-ristorante').then(m => m.FormVenditaRistorante)
  },
  {
    path: 'vendite-ristorante/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/vendite/form-vendita-ristorante/form-vendita-ristorante').then(m => m.FormVenditaRistorante)
  },
  {
    path: 'le-mie-prenotazioni',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cliente/le-mie-prenotazioni/le-mie-prenotazioni').then(m => m.LeMiePrenotazioni)
  },
  {
    path: 'le-mie-prenotazioni/nuova',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cliente/form-mia-prenotazione/form-mia-prenotazione').then(m => m.FormMiaPrenotazione)
  },
  {
    path: 'le-mie-prenotazioni/modifica/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cliente/form-mia-prenotazione/form-mia-prenotazione').then(m => m.FormMiaPrenotazione)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
