import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestituzioneService } from '../../../core/services/restituzione.service';
import { PrenotazioneService } from '../../../core/services/prenotazione.service';
import { RestituzioneDto } from '../../../core/models/restituzione.model';
import { PrenotazioneDto } from '../../../core/models/prenotazione.model';

// Form per registrare la restituzione di un'attrezzatura, legata a una
// prenotazione specifica letta dalla route.

@Component({
  selector: 'app-restituzione-prenotazione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restituzione-prenotazione.html',
  styleUrl: './restituzione-prenotazione.css'
})
export class RestituzionePrenotazione implements OnInit {

  prenotazioneId!: number;
  prenotazione: PrenotazioneDto | null = null;

  restituzione: Partial<RestituzioneDto> = {
    data: new Date().toISOString().split('T')[0],
    ora: new Date().toTimeString().slice(0, 5),
    danni: false,
    descrizioneDanni: ''
  };

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private restituzioneService: RestituzioneService,
    private prenotazioneService: PrenotazioneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    // Senza id non si può procedere: esce subito invece di rischiare un
    // Number(idParam) che darebbe NaN
    if (!idParam) {
      this.errorMessage = 'Prenotazione non specificata';
      this.isLoading = false;
      return;
    }

    this.prenotazioneId = Number(idParam);

    this.prenotazioneService.getById(this.prenotazioneId).subscribe({
      next: (data) => {
        this.prenotazione = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento della prenotazione';
        this.isLoading = false;
      }
    });
  }

  // Registra la restituzione, unendo i dati del form a prenotazioneId
  onSubmit(): void {
    this.errorMessage = '';

    const dto: RestituzioneDto = {
      ...this.restituzione,
      prenotazioneId: this.prenotazioneId
    } as RestituzioneDto;

    this.restituzioneService.effettua(dto).subscribe({
      next: () => this.router.navigate(['/prenotazioni']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante la registrazione della restituzione';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/prenotazioni']);
  }
}
