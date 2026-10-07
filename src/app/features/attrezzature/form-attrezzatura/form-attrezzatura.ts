import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttrezzaturaService } from '../../../core/services/attrezzatura.service';
import { AttrezzaturaDto, TipoAttrezzatura, StatoAttrezzatura } from '../../../core/models/attrezzatura.model';

// Form creazione/modifica attrezzatura.

@Component({
  selector: 'app-form-attrezzatura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-attrezzatura.html',
  styleUrl: './form-attrezzatura.css'
})
export class FormAttrezzatura implements OnInit {

  // Enum esposti al template per popolare le select
  tipi = Object.values(TipoAttrezzatura);
  stati = Object.values(StatoAttrezzatura);

  attrezzatura: AttrezzaturaDto = {
    nome: '',
    tipo: TipoAttrezzatura.CANOA,
    stato: StatoAttrezzatura.DISPONIBILE,
    descrizione: '',
    attiva: true
  };

  // Se presente, siamo in modalità modifica
  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private attrezzaturaService: AttrezzaturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    // Solo se c'è un id si attiva la modalità modifica e si carica
    // l'attrezzatura esistente; altrimenti si resta sul form vuoto di
    // default (isLoading resta false, niente da aspettare in creazione)
    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);
      this.isLoading = true;

      this.attrezzaturaService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.attrezzatura = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento dell\'attrezzatura';
          this.isLoading = false;
        }
      });
    }
  }

  // Salva l'attrezzatura: aggiorna se in modifica, altrimenti crea da zero
  onSubmit(): void {
    this.errorMessage = '';

    const operazione = this.isEditMode && this.idModifica
      ? this.attrezzaturaService.update(this.idModifica, this.attrezzatura)
      : this.attrezzaturaService.create(this.attrezzatura);

    operazione.subscribe({
      next: () => this.router.navigate(['/attrezzature']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/attrezzature']);
  }
}
