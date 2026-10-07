import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../../core/services/prenotazione.service';
import { AttrezzaturaService } from '../../../core/services/attrezzatura.service';
import { PrenotazioneDto, StatoPrenotazione } from '../../../core/models/prenotazione.model';
import { AttrezzaturaDto, TipoAttrezzatura } from '../../../core/models/attrezzatura.model';

// Form modifica prenotazione del cliente.

@Component({
  selector: 'app-form-mia-prenotazione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-mia-prenotazione.html',
  styleUrl: './form-mia-prenotazione.css'
})
export class FormMiaPrenotazione implements OnInit {

  tipi = Object.values(TipoAttrezzatura);
  selectedTipo: TipoAttrezzatura | undefined = undefined;
  attrezzatureDisponibili: AttrezzaturaDto[] = [];

  prenotazione: Partial<PrenotazioneDto> = {
    stato: StatoPrenotazione.ATTIVA,
    attiva: true,
    dataInizio: new Date().toISOString().split('T')[0],
    oraInizio: '',
    oraFine: '',
    attrezzaturaId: undefined
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private prenotazioneService: PrenotazioneService,
    private attrezzaturaService: AttrezzaturaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // MODALITÀ MODIFICA: carica la prenotazione, poi deduce il tipo
      // dell'attrezzatura associata per popolare correttamente la select
      this.isEditMode = true;
      this.idModifica = Number(idParam);

      this.prenotazioneService.getMiaById(this.idModifica).subscribe({
        next: (data) => {
          this.prenotazione = data;

          // Solo se la prenotazione ha già un'attrezzatura associata si
          // deduce il tipo per pre-popolare la select; altrimenti si
          // chiude subito il caricamento
          if (data.attrezzaturaId) {
            this.attrezzaturaService.getById(data.attrezzaturaId).subscribe({
              next: (attrezzatura) => {
                this.selectedTipo = attrezzatura.tipo;
                this.caricaAttrezzaturePerTipo(attrezzatura.tipo, () => {
                  this.isLoading = false;
                  this.cdr.detectChanges();
                });
              },
              error: () => {
                this.isLoading = false;
                this.cdr.detectChanges();
              }
            });
          } else {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento della prenotazione';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      // MODALITÀ CREAZIONE: nessun dato da caricare, si parte già pronti
      this.isLoading = false;
    }
  }

  // Quando il cliente sceglie un tipo di attrezzatura, carica le opzioni
  // disponibili di quel tipo (lista "oscurata", senza lo stato in tempo reale)
  onTipoChange(): void {
    // Resetta l'attrezzatura scelta finora: non avrebbe senso restasse
    // selezionata un'attrezzatura del tipo precedente
    this.prenotazione.attrezzaturaId = undefined;
    if (this.selectedTipo) {
      this.caricaAttrezzaturePerTipo(this.selectedTipo);
    } else {
      this.attrezzatureDisponibili = [];
    }
  }

  // Carica le attrezzature di un tipo.
  private caricaAttrezzaturePerTipo(tipo: TipoAttrezzatura, onComplete?: () => void): void {
    this.attrezzaturaService.getByTipo(tipo).subscribe({
      next: (data) => {
        this.attrezzatureDisponibili = data;
        onComplete?.();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle attrezzature disponibili';
        onComplete?.();
      }
    });
  }

  // Salva la prenotazione: aggiorna se in modifica, altrimenti crea da zero
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.prenotazioneService.updateMia(this.idModifica, this.prenotazione as PrenotazioneDto)
      : this.prenotazioneService.createMia(this.prenotazione as PrenotazioneDto);

    operazione.subscribe({
      next: () => this.router.navigate(['/le-mie-prenotazioni']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio della prenotazione';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/le-mie-prenotazioni']);
  }
}
