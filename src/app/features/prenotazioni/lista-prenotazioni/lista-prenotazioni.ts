import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../../../core/services/prenotazione.service';
import { AuthService } from '../../../core/services/auth.service';
import { PrenotazioneDto, StatoPrenotazione } from '../../../core/models/prenotazione.model';

// Pagina lista prenotazioni per lo staff (ADMIN/ISTRUTTORE), separata da
// LeMiePrenotazioni (vista del cliente).

@Component({
  selector: 'app-lista-prenotazioni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-prenotazioni.html',
  styleUrl: './lista-prenotazioni.css'
})
export class ListaPrenotazioni implements OnInit {

  prenotazioni: PrenotazioneDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Esposto al template per i confronti *ngIf
  StatoPrenotazione = StatoPrenotazione;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.caricaPrenotazioni();
  }

  // Carica la lista delle prenotazioni dal backend
  caricaPrenotazioni(): void {
    this.isLoading = true;
    this.prenotazioneService.getAll().subscribe({
      next: (data) => {
        this.prenotazioni = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Errore nel caricamento delle prenotazioni';
        this.cdr.detectChanges();
      }
    });
  }

  // Annulla una prenotazione, dopo conferma dell'utente
  annulla(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler annullare questa prenotazione?')) return;

    this.prenotazioneService.delete(id).subscribe({
      next: () => this.caricaPrenotazioni(),
      error: () => alert('Errore durante l\'annullamento')
    });
  }

  // Naviga al form di restituzione attrezzatura per questa prenotazione
  restituisci(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/prenotazioni/restituzione', id]);
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

  goToDashboard(): void {
    this.router.navigate([this.authService.getHomeRoute()]);
  }

  nuovaPrenotazione(): void {
    this.router.navigate(['/prenotazioni/nuova']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/prenotazioni/modifica', id]);
  }
}
