import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../../../core/services/prenotazione.service';
import { AuthService } from '../../../core/services/auth.service';
import { PrenotazioneDto, StatoPrenotazione } from '../../../core/models/prenotazione.model';

// Pagina che mostra l'elenco delle prenotazioni del cliente loggato, con la possibilità di
// annullarle o navigare verso il form di creazione/modifica.

@Component({
  selector: 'app-le-mie-prenotazioni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './le-mie-prenotazioni.html',
  styleUrl: './le-mie-prenotazioni.css'
})
export class LeMiePrenotazioni implements OnInit {

  prenotazioni: PrenotazioneDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  username: string | null;

  // Ripropone l'enum come proprietà della classe: nel template Angular si
  // possono leggere solo proprietà dell'istanza, non i tipi importati
  // direttamente, quindi serve questa "copia" per usarlo nell'HTML
  StatoPrenotazione = StatoPrenotazione;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.carica();
  }

  // Carica le prenotazioni del cliente loggato dal backend
  carica(): void {
    this.isLoading = true;
    this.prenotazioneService.getMie().subscribe({
      next: (data) => {
        // Più recenti prima
        this.prenotazioni = data.sort((a, b) => b.dataInizio.localeCompare(a.dataInizio));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle tue prenotazioni';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Annulla una prenotazione propria, dopo conferma dell'utente
  annulla(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler annullare questa prenotazione?')) return;

    this.prenotazioneService.deleteMia(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'annullamento')
    });
  }

  // Restituisce la classe CSS in base allo stato, per colorare il badge
  statoClass(stato: StatoPrenotazione): string {
    switch (stato) {
      case StatoPrenotazione.ATTIVA: return 'badge-green';
      case StatoPrenotazione.COMPLETATA: return 'badge-blue';
      case StatoPrenotazione.ANNULLATA: return 'badge-red';
      default: return '';
    }
  }

  nuovaPrenotazione(): void {
    this.router.navigate(['/le-mie-prenotazioni/nuova']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/le-mie-prenotazioni/modifica', id]);
  }

  logout(): void {
    this.authService.logout();
  }
}
