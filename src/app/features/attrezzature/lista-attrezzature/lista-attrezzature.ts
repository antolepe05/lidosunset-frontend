import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AttrezzaturaService } from '../../../core/services/attrezzatura.service';
import { AuthService } from '../../../core/services/auth.service';
import { AttrezzaturaDto, StatoAttrezzatura } from '../../../core/models/attrezzatura.model';

// Pagina lista attrezzature.
@Component({
  selector: 'app-lista-attrezzature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-attrezzature.html',
  styleUrl: './lista-attrezzature.css'
})
export class ListaAttrezzature implements OnInit {

  attrezzature: AttrezzaturaDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private attrezzaturaService: AttrezzaturaService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  // Carica la lista delle attrezzature dal backend
  carica(): void {
    this.isLoading = true;
    this.attrezzaturaService.getAll().subscribe({
      next: (data) => {
        this.attrezzature = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle attrezzature';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Elimina (disattiva) un'attrezzatura, dopo conferma dell'utente
  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler eliminare questa attrezzatura?')) return;

    this.attrezzaturaService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  // Restituisce la classe CSS in base allo stato, per colorare il badge
  statoClass(stato: StatoAttrezzatura): string {
    switch (stato) {
      case StatoAttrezzatura.DISPONIBILE: return 'badge-green';
      case StatoAttrezzatura.PRENOTATA: return 'badge-blue';
      case StatoAttrezzatura.IN_MANUTENZIONE: return 'badge-red';
      default: return '';
    }
  }

  goToDashboard(): void {
    this.router.navigate([this.authService.getHomeRoute()]);
  }

  nuovaAttrezzatura(): void {
    this.router.navigate(['/attrezzature/nuova']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/attrezzature/modifica', id]);
  }
}
