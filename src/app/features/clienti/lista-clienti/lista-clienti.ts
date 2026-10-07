import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClienteDto } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-lista-clienti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-clienti.html',
  styleUrl: './lista-clienti.css'
})
export class ListaClienti implements OnInit {

  clienti: ClienteDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carica();
  }

  carica(): void {
    this.isLoading = true;
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clienti = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei clienti';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  elimina(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Disattivare questo cliente? Non potrà più accedere al sistema di prenotazione.')) return;

    this.clienteService.delete(id).subscribe({
      next: () => this.carica(),
      error: (err) => alert(err.error?.error ?? 'Errore durante la disattivazione')
    });
  }

  // L'istruttore può consultare la lista (gli serve per creare prenotazioni
  // per conto di un cliente) ma non può modificare o disattivare anagrafiche
  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  goToDashboard(): void {
    this.router.navigate([this.authService.getHomeRoute()]);
  }

  nuovoCliente(): void {
    this.router.navigate(['/clienti/nuovo']);
  }

  modifica(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/clienti/modifica', id]);
  }
}
