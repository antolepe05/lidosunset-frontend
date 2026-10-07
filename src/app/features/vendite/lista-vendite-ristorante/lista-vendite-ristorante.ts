import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VenditaRistoranteService } from '../../../core/services/vendita-ristorante.service';
import { VenditaRistoranteDto } from '../../../core/models/vendita-ristorante.model';

// Pagina lista vendite ristorante.

@Component({
  selector: 'app-lista-vendite-ristorante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-vendite-ristorante.html',
  styleUrl: './lista-vendite-ristorante.css'
})
export class ListaVenditeRistorante implements OnInit {

  vendite: VenditaRistoranteDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private venditaService: VenditaRistoranteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  // Carica la lista delle vendite dal backend
  carica(): void {
    this.isLoading = true;
    this.venditaService.getAll().subscribe({
      next: (data) => {
        // Più recenti prima
        this.vendite = data.sort((a, b) => b.data.localeCompare(a.data));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle vendite';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Elimina (disattiva) una vendita, dopo conferma dell'utente
  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler eliminare questa vendita?')) return;

    this.venditaService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  // Somma i totali di tutte le vendite caricate
  totaleComplessivo(): number {
    return this.vendite.reduce((sum, v) => sum + (v.totale || 0), 0);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  nuovaVendita(): void {
    this.router.navigate(['/vendite-ristorante/nuova']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/vendite-ristorante/modifica', id]);
  }
}
