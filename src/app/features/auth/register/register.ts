import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  request: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    nome: '',
    cognome: '',
    telefono: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.request).subscribe({
      next: () => {
        // Registrazione riuscita: il backend restituisce già un token,
        // quindi l'utente è subito loggato e reindirizzato alla sua home
        this.router.navigate([this.authService.getHomeRoute()]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error ?? 'Errore durante la registrazione';
      }
    });
  }
}
