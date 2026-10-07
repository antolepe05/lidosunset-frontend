import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcquistoAttrezzaturaService } from '../../../core/services/acquisto-attrezzatura.service';
import { FornitoreService } from '../../../core/services/fornitore.service';
import { AcquistoAttrezzaturaDto, StatoAcquisto } from '../../../core/models/acquisto-attrezzatura.model';
import { FornitoreDto } from '../../../core/models/fornitore.model';

// Form di lista acquisti attrezzature
@Component({
  selector: 'app-lista-acquisti-attrezzature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-acquisti-attrezzature.html',
  styleUrl: './lista-acquisti-attrezzature.css'
})
export class ListaAcquistiAttrezzature implements OnInit {

  acquisti: AcquistoAttrezzaturaDto[] = [];
  fornitoriMap: Map<number, string> = new Map();
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private acquistoService: AcquistoAttrezzaturaService,
    private fornitoreService: FornitoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fornitoreService.getAll().subscribe({
      next: (fornitori: FornitoreDto[]) => {
        fornitori.forEach(f => {
          if (f.id) this.fornitoriMap.set(f.id, f.nome);
        });
      }
    });

    this.carica();
  }

  // Carica la lista degli acquisti dal backend
  carica(): void {
    this.isLoading = true;
    this.acquistoService.getAll().subscribe({
      next: (data) => {
        this.acquisti = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento degli acquisti';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Risolve il nome del fornitore dalla mappa, con fallback sull'id se assente
  nomeFornitore(fornitoreId: number): string {
    return this.fornitoriMap.get(fornitoreId) ?? `#${fornitoreId}`;
  }

  // Elimina (disattiva) un acquisto, dopo conferma dell'utente
  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler eliminare questo acquisto?')) return;

    this.acquistoService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  statoClass(stato: StatoAcquisto): string {
    switch (stato) {
      case StatoAcquisto.IN_ATTESA: return 'badge-yellow';
      case StatoAcquisto.RICEVUTO: return 'badge-green';
      case StatoAcquisto.ANNULLATO: return 'badge-red';
      default: return '';
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  nuovoAcquisto(): void {
    this.router.navigate(['/acquisti-attrezzature/nuovo']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/acquisti-attrezzature/modifica', id]);
  }
}
