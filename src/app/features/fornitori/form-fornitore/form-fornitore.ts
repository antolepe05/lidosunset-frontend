import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornitoreService } from '../../../core/services/fornitore.service';
import { FornitoreDto, SettoreFornitore } from '../../../core/models/fornitore.model';

// Form creazione/modifica fornitore.

@Component({
  selector: 'app-form-fornitore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-fornitore.html',
  styleUrl: './form-fornitore.css'
})
export class FormFornitore implements OnInit {

  settori = Object.values(SettoreFornitore);

  fornitore: FornitoreDto = {
    nome: '',
    partitaIva: '',
    email: '',
    telefono: '',
    indirizzo: '',
    settore: SettoreFornitore.ATTREZZATURE_SPORTIVE,
    attiva: true
  };

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fornitoreService: FornitoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Se c'è un id si carica il fornitore esistente in modalità modifica,
    // altrimenti si resta sul form vuoto con i valori di default già pronti
    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);
      this.isLoading = true;

      this.fornitoreService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.fornitore = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento del fornitore';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    // Salva il fornitore: aggiorna se in modifica, altrimenti crea da zero
    const operazione = this.isEditMode && this.idModifica
      ? this.fornitoreService.update(this.idModifica, this.fornitore)
      : this.fornitoreService.create(this.fornitore);

    operazione.subscribe({
      next: () => this.router.navigate(['/fornitori']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/fornitori']);
  }
}
