import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcquistoRistoranteService } from '../../../core/services/acquisto-ristorante.service';
import { AuthService } from '../../../core/services/auth.service';
import { StatoAcquisto } from '../../../core/models/acquisto-attrezzatura.model';
import { AcquistoRistoranteDto } from '../../../core/models/acquisto-ristorante.model';

// Pagina lista acquisti ristorante.
@Component({
  selector: 'app-lista-acquisti-ristorante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-acquisti-ristorante.html',
  styleUrl: './lista-acquisti-ristorante.css'
})
export class ListaAcquistiRistorante implements OnInit {

  acquisti: AcquistoRistoranteDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private acquistoService: AcquistoRistoranteService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  // Carica la lista degli acquisti dal backend
  carica(): void {
    this.isLoading = true;
    this.acquistoService.getAll().subscribe({
      // Successo: salva i dati e nasconde lo spinner di caricamento
      next: (data) => {
        this.acquisti = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      // Errore: mostra un messaggio generico (qui non si usa il dettaglio
      // dell'errore del backend, a differenza di elimina() più sotto)
      error: () => {
        this.errorMessage = 'Errore nel caricamento degli acquisti';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Elimina (disattiva) un acquisto, dopo conferma dell'utente
  elimina(id: number | undefined): void {
    // Senza id non si può procedere
    if (!id) return;
    // confirm() è il dialogo nativo del browser - funzionale ma non
    // personalizzabile; un modale custom sarebbe più in linea con lo stile dell'app
    if (!confirm('Sei sicuro di voler eliminare questo acquisto?')) return;

    this.acquistoService.delete(id).subscribe({
      // Successo: ricarica la lista per riflettere l'eliminazione
      next: () => this.carica(),
      // Errore: mostra il messaggio del backend se presente, altrimenti uno generico
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  // Determina la classe CSS del badge colorato in base allo stato
  // (alternativa: una mappa Record<StatoAcquisto, string> invece dello switch,
  // leggermente più compatta da estendere)
  statoClass(stato: StatoAcquisto): string {
    switch (stato) {
      case StatoAcquisto.IN_ATTESA: return 'badge-yellow'; // ordine non ancora arrivato
      case StatoAcquisto.RICEVUTO: return 'badge-green'; // ordine arrivato, spesa reale
      case StatoAcquisto.ANNULLATO: return 'badge-red'; // ordine annullato
      default: return ''; // stato non previsto: nessun badge
    }
  }

  // Solo l'ADMIN ha una dashboard a cui tornare; il barista atterra
  // direttamente qui dopo il login, quindi per lui nascondiamo il pulsante
  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  goToDashboard(): void {
    this.router.navigate([this.authService.getHomeRoute()]);
  }

  nuovoAcquisto(): void {
    this.router.navigate(['/acquisti-ristorante/nuovo']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/acquisti-ristorante/modifica', id]);
  }
}
