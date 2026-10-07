import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ClienteDto } from '../models/cliente.model';
import { RegisterRequest, AuthResponse } from '../models/auth.model';

// Service per i clienti

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = `${environment.apiUrl}/clienti`;

  constructor(private http: HttpClient) {}

  // Lista completa dei clienti
  getAll(): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>(this.apiUrl);
  }

  // Dettaglio di un singolo cliente
  getById(id: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuovo cliente (solo anagrafica, senza accesso al sistema)
  create(dto: ClienteDto): Observable<ClienteDto> {
    return this.http.post<ClienteDto>(this.apiUrl, dto);
  }

  // Aggiorna un cliente esistente
  update(id: number, dto: ClienteDto): Observable<ClienteDto> {
    return this.http.put<ClienteDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina (disattiva) un cliente
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Crea cliente + credenziali di accesso insieme: chiama /auth/registra-cliente
  // (non /clienti), perché serve creare anche l'Utente per il login
  creaConAccesso(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/registra-cliente`, request);
  }

  // Ricerca live per nome o cognome (usata nel form prenotazioni)
  cerca(query: string): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>(`${this.apiUrl}/cerca`, { params: { query } });
  }
}
