import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManutenzioneService } from '../../../core/services/manutenzione.service';
import { AuthService } from '../../../core/services/auth.service';
import { ManutenzioneDto, TipoManutenzione } from '../../../core/models/manutenzione.model';

// Pagina lista manutenzioni, visibile ad ADMIN e ISTRUTTORE - solo l'ADMIN
// può eliminarle (isAdmin() sotto).

@Component({
  selector: 'app-lista-manutenzioni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-manutenzioni.html',
  styleUrl: './lista-manutenzioni.css'
})
export class ListaManutenzioni implements OnInit {

  manutenzioni: ManutenzioneDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private manutenzioneService: ManutenzioneService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  carica(): void {
    this.isLoading = true;
    this.manutenzioneService.getAll().subscribe({
      next: (data) => {
        this.manutenzioni = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento delle manutenzioni';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Sei sicuro di voler eliminare questa manutenzione?')) return;

    this.manutenzioneService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante l\'eliminazione')
    });
  }

  tipoClass(tipo: TipoManutenzione): string {
    switch (tipo) {
      case TipoManutenzione.PREVENTIVA: return 'badge-green';
      case TipoManutenzione.ORDINARIA: return 'badge-blue';
      case TipoManutenzione.URGENTE: return 'badge-red';
      default: return '';
    }
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  goToDashboard(): void {
    this.router.navigate([this.authService.getHomeRoute()]);
  }

  nuovaManutenzione(): void {
    this.router.navigate(['/manutenzioni/nuova']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/manutenzioni/modifica', id]);
  }
}
