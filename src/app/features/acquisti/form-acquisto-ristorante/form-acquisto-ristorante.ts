import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcquistoRistoranteService } from '../../../core/services/acquisto-ristorante.service';
import { FornitoreService } from '../../../core/services/fornitore.service';
import { AcquistoRistoranteDto, RigaAcquistoRistoranteDto } from '../../../core/models/acquisto-ristorante.model';
import { StatoAcquisto } from '../../../core/models/acquisto-attrezzatura.model';
import { FornitoreDto, SettoreFornitore } from '../../../core/models/fornitore.model';

// Form creazione/modifica acquisto attrezzature

@Component({
  selector: 'app-form-acquisto-ristorante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-acquisto-ristorante.html',
  styleUrl: './form-acquisto-ristorante.css'
})
export class FormAcquistoRistorante implements OnInit {

  stati = Object.values(StatoAcquisto);
  fornitori: FornitoreDto[] = [];

  acquisto: Partial<AcquistoRistoranteDto> = {
    dataOrdine: new Date().toISOString().split('T')[0],
    dataRicezione: '',
    stato: StatoAcquisto.IN_ATTESA,
    note: '',
    attiva: true,
    fornitoreId: undefined,
    righe: [this.rigaVuota()]
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private acquistoService: AcquistoRistoranteService,
    private fornitoreService: FornitoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mostra solo i fornitori del settore "ristorazione",
    // evitando di mescolarli con quelli delle attrezzature.
    this.fornitoreService.getAll().subscribe({
      next: (data) => this.fornitori = data.filter(f => f.settore === SettoreFornitore.RISTORAZIONE),
      error: () => this.errorMessage = 'Errore nel caricamento dei fornitori'
    });

    // Se c'è un id nella route, siamo in modalità modifica: si carica
    // l'acquisto esistente. Altrimenti si resta sul form vuoto già inizializzato
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);

      this.acquistoService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.acquisto = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento dell\'acquisto';
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
  // Crea una riga vuota di default.
  rigaVuota(): RigaAcquistoRistoranteDto {
    return {
      prodotto: '',
      quantita: 1,
      prezzoUnitario: 0,
      prezzoTotale: 0,
      note: ''
    };
  }
  // Aggiunge una nuova riga prodotto al form
  aggiungiRiga(): void {
    this.acquisto.righe!.push(this.rigaVuota());
  }

  // Rimuove una riga, a patto che non resti l'ordine senza nessuna riga
  rimuoviRiga(index: number): void {
    if (this.acquisto.righe!.length <= 1) return;
    this.acquisto.righe!.splice(index, 1);
    this.calcolaTotaleOrdine();
  }

  // Ricalcola il totale di una singola riga (quantità × prezzo unitario)
  calcolaTotaleRiga(riga: RigaAcquistoRistoranteDto): void {
    riga.prezzoTotale = (riga.quantita || 0) * (riga.prezzoUnitario || 0);
    this.calcolaTotaleOrdine();
  }

  // Ricalcola il totale dell'intero ordine sommando tutte le righe
  calcolaTotaleOrdine(): void {
    this.acquisto.prezzoTotale = (this.acquisto.righe || [])
      .reduce((sum, r) => sum + (r.prezzoTotale || 0), 0);
  }

  // Salva l'acquisto: aggiorna se in modifica, altrimenti crea da zero.
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.acquistoService.update(this.idModifica, this.acquisto as AcquistoRistoranteDto)
      : this.acquistoService.create(this.acquisto as AcquistoRistoranteDto);

    operazione.subscribe({
      next: () => this.router.navigate(['/acquisti-ristorante']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/acquisti-ristorante']);
  }
}
