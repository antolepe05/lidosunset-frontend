import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { ClienteDto } from '../../../core/models/cliente.model';

// Form creazione/modifica cliente. In creazione, opzionalmente, può anche
// generare le credenziali di accesso (creaConAccesso) insieme all'anagrafica.

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-cliente.html',
  styleUrl: './form-cliente.css'
})
export class FormCliente implements OnInit {

  cliente: Partial<ClienteDto> = {
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    attiva: true
  };

  // Usati solo in modalità creazione, se si vogliono creare anche le credenziali
  creaAccesso: boolean = false;
  username: string = '';
  password: string = '';

  idModifica: number | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.idModifica = Number(idParam);
      this.isLoading = true;

      this.clienteService.getById(this.idModifica).subscribe({
        next: (data) => {
          this.cliente = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Errore nel caricamento del cliente';
          this.isLoading = false;
        }
      });
    }
  }

  // Tre casi possibili: creazione con credenziali (return anticipato),
  // aggiornamento, o creazione senza credenziali (questi ultimi due nel
  // ternario sotto) - un po' incoerente come stile mescolare l'if con return
  // e il ternario, ma funziona; si poteva unificare in un solo if/else-if/else.
  onSubmit(): void {
    this.errorMessage = '';

    // Modalità creazione con credenziali di accesso incluse.
    // Il controllo su !isEditMode protegge da un eventuale creaAccesso=true
    // rimasto attivo per errore anche in modalità modifica
    if (!this.isEditMode && this.creaAccesso) {
      this.clienteService.creaConAccesso({
        nome: this.cliente.nome!,
        cognome: this.cliente.cognome!,
        email: this.cliente.email!,
        telefono: this.cliente.telefono,
        username: this.username,
        password: this.password
      }).subscribe({
        next: () => this.router.navigate(['/clienti']),
        error: (err) => {
          this.errorMessage = err.error?.error ?? 'Errore durante la creazione dell\'account';
        }
      });
      return;
    }

    const operazione = this.isEditMode && this.idModifica
      ? this.clienteService.update(this.idModifica, this.cliente as ClienteDto)
      : this.clienteService.create(this.cliente as ClienteDto);

    operazione.subscribe({
      next: () => this.router.navigate(['/clienti']),
      error: (err) => {
        this.errorMessage = err.error?.error ?? 'Errore durante il salvataggio del cliente';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clienti']);
  }
}
