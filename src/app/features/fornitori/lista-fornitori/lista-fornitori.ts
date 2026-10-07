import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FornitoreService } from '../../../core/services/fornitore.service';
import { FornitoreDto, SettoreFornitore } from '../../../core/models/fornitore.model';

// Pagina lista fornitori.

@Component({
  selector: 'app-lista-fornitori',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-fornitori.html',
  styleUrl: './lista-fornitori.css'
})
export class ListaFornitori implements OnInit {

  fornitori: FornitoreDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private fornitoreService: FornitoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  // Carica la lista dei fornitori dal backend
  carica(): void {
    this.isLoading = true;
    this.fornitoreService.getAll().subscribe({
      next: (data) => {
        this.fornitori = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei fornitori';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Elimina (disattiva) un fornitore, dopo conferma dell'utente
  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler eliminare questo fornitore?')) return;

    this.fornitoreService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  // Restituisce la classe CSS in base al settore, per colorare il badge
  settoreClass(settore: SettoreFornitore): string {
    switch (settore) {
      case SettoreFornitore.ATTREZZATURE_SPORTIVE: return 'badge-blue';
      case SettoreFornitore.RISTORAZIONE: return 'badge-green';
      default: return '';
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  nuovoFornitore(): void {
    this.router.navigate(['/fornitori/nuovo']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/fornitori/modifica', id]);
  }
}
