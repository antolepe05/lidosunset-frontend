import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenditaRistoranteService } from '../../../core/services/vendita-ristorante.service';
import { VenditaRistoranteDto } from '../../../core/models/vendita-ristorante.model';

// Form creazione/modifica vendita ristorante.

@Component({
  selector: 'app-form-vendita-ristorante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-vendita-ristorante.html',
  styleUrl: './form-vendita-ristorante.css'
})
export class FormVenditaRistorante implements OnInit {

  vendita: VenditaRistoranteDto = {
    data: new Date().toISOString().split('T')[0],
    totale: 0,
    note: '',
    attiva: true
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private venditaService: VenditaRistoranteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Se c'è un id si carica la vendita esistente in modalità modifica,
    // altrimenti si resta sul form vuoto con i valori di default già pronti
    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);
      this.isLoading = true;

      this.venditaService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.vendita = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento della vendita';
          this.isLoading = false;
        }
      });
    }
  }

  // Salva la vendita: aggiorna se in modifica, altrimenti crea da zero
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.venditaService.update(this.idModifica, this.vendita)
      : this.venditaService.create(this.vendita);

    operazione.subscribe({
      next: () => this.router.navigate(['/vendite-ristorante']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vendite-ristorante']);
  }
}
