import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManutenzioneService } from '../../../core/services/manutenzione.service';
import { AttrezzaturaService } from '../../../core/services/attrezzatura.service';
import { ManutenzioneDto, TipoManutenzione } from '../../../core/models/manutenzione.model';
import { AttrezzaturaDto } from '../../../core/models/attrezzatura.model';

// Form creazione/modifica manutenzione.

@Component({
  selector: 'app-form-manutenzione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-manutenzione.html',
  styleUrl: './form-manutenzione.css'
})
export class FormManutenzione implements OnInit {

  tipi = Object.values(TipoManutenzione);
  attrezzature: AttrezzaturaDto[] = [];

  manutenzione: Partial<ManutenzioneDto> = {
    data: '',
    descrizione: '',
    tipo: TipoManutenzione.ORDINARIA,
    completata: false,
    note: '',
    attiva: true,
    costo: undefined,
    attrezzaturaId: undefined
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private manutenzioneService: ManutenzioneService,
    private attrezzaturaService: AttrezzaturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carica sempre la lista attrezzature,
    this.attrezzaturaService.getAll().subscribe({
      next: (data) => {
        this.attrezzature = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle attrezzature';
        this.isLoading = false;
      }
    });

    // Se c'è un id, carica anche la manutenzione esistente (modalità modifica)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);
      this.isLoading = true;

      this.manutenzioneService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.manutenzione = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento della manutenzione';
          this.isLoading = false;
        }
      });
    }
  }

  // Salva la manutenzione: aggiorna se in modifica, altrimenti crea da zero
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.manutenzioneService.update(this.idModifica, this.manutenzione as ManutenzioneDto)
      : this.manutenzioneService.create(this.manutenzione as ManutenzioneDto);

    operazione.subscribe({
      next: () => this.router.navigate(['/manutenzioni']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/manutenzioni']);
  }
}
