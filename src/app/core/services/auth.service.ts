import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

// @Injectable: questo servizio è disponibile in tutta l'applicazione (root injector).
// Gestisce login, registrazione, logout e salvataggio del token JWT nel localStorage.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // Chiavi usate per salvare i dati nel localStorage
  private readonly TOKEN_KEY = 'token';
  private readonly USERNAME_KEY = 'username';
  private readonly ROLE_KEY = 'ruolo';

  // PLATFORM_ID è necessario per SSR: localStorage non esiste lato server.
  // Usiamo isPlatformBrowser() per verificare di essere nel browser prima
  // di accedere a localStorage.
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Invia le credenziali al backend e salva il token JWT in localStorage.
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // Invia i dati di registrazione al backend.
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // Salva token, username e ruolo nel localStorage.
  private saveSession(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USERNAME_KEY, response.username);
      localStorage.setItem(this.ROLE_KEY, response.ruolo);
    }
  }

  // Rimuove i dati dal localStorage e reindirizza al login.
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USERNAME_KEY);
      localStorage.removeItem(this.ROLE_KEY);
    }
    this.router.navigate(['/login']);
  }

  // Restituisce il token JWT salvato, o null se non presente.
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Restituisce il ruolo dell'utente loggato.
  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.ROLE_KEY);
    }
    return null;
  }

  // Restituisce lo username dell'utente loggato.
  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.USERNAME_KEY);
    }
    return null;
  }

  // Restituisce true se l'utente è autenticato (token presente).
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Verifica se l'utente ha un determinato ruolo.
  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  // Restituisce la rotta di "casa" appropriata in base al ruolo dell'utente loggato.
  // Ogni ruolo ha una sua pagina di partenza, dato che non tutti hanno accesso
  // alla dashboard con le statistiche finanziarie (riservata all'ADMIN).
  getHomeRoute(): string {
    switch (this.getRole()) {
      case 'ADMIN': return '/dashboard';
      case 'ISTRUTTORE': return '/istruttore';
      case 'BARISTA': return '/acquisti-ristorante';
      case 'CLIENTE': return '/le-mie-prenotazioni';
      default: return '/login';
    }
  }
}
