import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

// Home page per l'istruttore dopo il login.

@Component({
  selector: 'app-home-istruttore',
  standalone: true,
  imports: [],
  templateUrl: './home-istruttore.html',
  styleUrl: './home-istruttore.css'
})
export class HomeIstruttore {

  username: string | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.authService.getUsername();
  }

  // Stesso pattern generico della Dashboard, parametrizzato sul percorso
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
  }
}
