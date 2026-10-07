import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardDatiDto } from '../../core/models/dashboard.model';

// Dashboard admin: mostra i KPI aggregati (getReportGiornaliero, nome
// coerente con quello discusso lato backend) e i pulsanti di navigazione
// verso le varie sezioni gestionali.

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  dati: DashboardDatiDto | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getReportGiornaliero().subscribe({
      next: (data) => {
        this.dati = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Errore nel caricamento dei dati';
      }
    });
  }

  // Getter invece di un campo popolato una volta: legge sempre il valore
  // attuale da authService, senza rischiare di restare "indietro"
  get username(): string {
    return this.authService.getUsername() ?? '';
  }

  get ruolo(): string {
    return this.authService.getRole() ?? '';
  }

  logout(): void {
    this.authService.logout();
  }

  // Metodo generico parametrizzato sul percorso, invece di un metodo dedicato
  // per ogni destinazione (come fanno altri componenti, es. nuovoCliente()) -
  // ha senso qui, dato che la dashboard ha molti pulsanti di navigazione diversi
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
