import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PrenotazioneService } from '../../../core/services/prenotazione.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { AttrezzaturaService } from '../../../core/services/attrezzatura.service';
import { PrenotazioneDto, StatoPrenotazione } from '../../../core/models/prenotazione.model';
import { ClienteDto } from '../../../core/models/cliente.model';
import { AttrezzaturaDto } from '../../../core/models/attrezzatura.model';

// Form creazione/modifica prenotazione per lo staff, con ricerca cliente
// "live" al posto di una select con tutta l'anagrafica.

@Component({
  selector: 'app-nuova-prenotazione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuova-prenotazione.html',
  styleUrl: './nuova-prenotazione.css'
})
export class NuovaPrenotazione implements OnInit, OnDestroy {

  attrezzature: AttrezzaturaDto[] = [];

  // Ricerca cliente "live" per nome/cognome, al posto della select con tutta l'anagrafica
  clienteSearchQuery: string = '';
  risultatiRicerca: ClienteDto[] = [];
  clienteSelezionato: ClienteDto | null = null;
  private ricercaSubject = new Subject<string>();
  private ricercaSubscription?: Subscription;

  prenotazione: Partial<PrenotazioneDto> = {
    stato: StatoPrenotazione.ATTIVA,
    attiva: true,
    dataInizio: '',
    oraInizio: '',
    oraFine: '',
    clienteId: undefined,
    attrezzaturaId: undefined
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private prenotazioneService: PrenotazioneService,
    private clienteService: ClienteService,
    private attrezzaturaService: AttrezzaturaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Ricerca "live": aspetta 300ms di pausa nella digitazione, ignora query
    // duplicate consecutive, e annulla la ricerca precedente se ne arriva
    // una nuova prima che sia conclusa
    this.ricercaSubscription = this.ricercaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.trim().length < 2) {
          return of([]);
        }
        return this.clienteService.cerca(query);
      })
    ).subscribe({
      next: (data) => this.risultatiRicerca = data,
      error: () => this.risultatiRicerca = []
    });

    // Carica le attrezzature per la select
    this.attrezzaturaService.getAll().subscribe({
      next: (data) => this.attrezzature = data,
      error: () => this.errorMessage = 'Errore nel caricamento delle attrezzature'
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // MODALITÀ MODIFICA: carica la prenotazione, poi il cliente già
      // associato per mostrarlo subito come selezionato
      this.isEditMode = true;
      this.idModifica = Number(idParam);

      this.prenotazioneService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.prenotazione = data;

          if (data.clienteId) {
            this.clienteService.getById(data.clienteId).subscribe({
              next: (cliente) => {
                this.clienteSelezionato = cliente;
                this.isLoading = false;
                this.cdr.detectChanges();
              },
              error: () => {
                this.isLoading = false;
                this.cdr.detectChanges();
              }
            });
          } else {
            this.isLoading = false;
          }
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento della prenotazione';
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  // Se si lascia la pagina, il componente viene distrutto con il metodo unsubscribe() e non si ascolta più quello che si digita
  ngOnDestroy(): void {
    this.ricercaSubscription?.unsubscribe();
  }

  // Ogni digitazione invia la query al Subject, che la instrada nella pipeline sopra
  onSearchChange(): void {
    this.ricercaSubject.next(this.clienteSearchQuery);
  }

  // Seleziona un cliente dai risultati e chiude la ricerca
  selezionaCliente(cliente: ClienteDto): void {
    this.clienteSelezionato = cliente;
    this.prenotazione.clienteId = cliente.id;
    this.clienteSearchQuery = '';
    this.risultatiRicerca = [];
  }

  // Deseleziona il cliente, per permettere di cercarne un altro
  rimuoviClienteSelezionato(): void {
    this.clienteSelezionato = null;
    this.prenotazione.clienteId = undefined;
  }

  // Salva la prenotazione: aggiorna se in modifica, altrimenti crea da zero
  onSubmit(): void {
    this.errorMessage = '';

    if (!this.prenotazione.clienteId) {
      this.errorMessage = 'Seleziona un cliente dalla ricerca prima di procedere.';
      return;
    }

    const operazione = this.isEditMode && this.idModifica
      ? this.prenotazioneService.update(this.idModifica, this.prenotazione as PrenotazioneDto)
      : this.prenotazioneService.create(this.prenotazione as PrenotazioneDto);

    operazione.subscribe({
      next: () => {
        this.router.navigate(['/prenotazioni']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio della prenotazione';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/prenotazioni']);
  }
}
