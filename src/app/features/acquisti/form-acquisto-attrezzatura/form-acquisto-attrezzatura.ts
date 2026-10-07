import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcquistoAttrezzaturaService } from '../../../core/services/acquisto-attrezzatura.service';
import { FornitoreService } from '../../../core/services/fornitore.service';
import { AcquistoAttrezzaturaDto, RigaAcquistoAttrezzaturaDto, StatoAcquisto } from '../../../core/models/acquisto-attrezzatura.model';
import { TipoAttrezzatura } from '../../../core/models/attrezzatura.model';
import { FornitoreDto, SettoreFornitore } from '../../../core/models/fornitore.model';

// Form per la creazione e la modifica di acquisto attrezzature

@Component({
  selector: 'app-form-acquisto-attrezzatura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-acquisto-attrezzatura.html',
  styleUrl: './form-acquisto-attrezzatura.css'
})
export class FormAcquistoAttrezzatura implements OnInit {

  tipi = Object.values(TipoAttrezzatura);
  stati = Object.values(StatoAcquisto);
  fornitori: FornitoreDto[] = [];

  acquisto: Partial<AcquistoAttrezzaturaDto> = {
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
    private acquistoService: AcquistoAttrezzaturaService,
    private fornitoreService: FornitoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mostra solo i fornitori del settore "attrezzature sportive",
    // evitando di mescolarli con quelli del ristorante.
    this.fornitoreService.getAll().subscribe({
      next: (data) => this.fornitori = data.filter(f => f.settore === SettoreFornitore.ATTREZZATURE_SPORTIVE),
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

  rigaVuota(): RigaAcquistoAttrezzaturaDto {
    return {
      tipoAttrezzatura: TipoAttrezzatura.CANOA,
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
  calcolaTotaleRiga(riga: RigaAcquistoAttrezzaturaDto): void {
    riga.prezzoTotale = (riga.quantita || 0) * (riga.prezzoUnitario || 0);
    this.calcolaTotaleOrdine();
  }

  //Ricalcola il totale dell'intero ordine sommando tutte le righe
  calcolaTotaleOrdine(): void {
    this.acquisto.prezzoTotale = (this.acquisto.righe || [])
      .reduce((sum, r) => sum + (r.prezzoTotale || 0), 0);
  }

  // Salva l'acquisto: aggiorna se in modifica, altrimenti crea da zero.
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.acquistoService.update(this.idModifica, this.acquisto as AcquistoAttrezzaturaDto)
      : this.acquistoService.create(this.acquisto as AcquistoAttrezzaturaDto);

    operazione.subscribe({
      next: () => this.router.navigate(['/acquisti-attrezzature']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/acquisti-attrezzature']);
  }
}
