import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ManutenzioneDto } from '../models/manutenzione.model';

// Service per le manutenzioni

@Injectable({
  providedIn: 'root'
})
export class ManutenzioneService {

  private readonly apiUrl = `${environment.apiUrl}/manutenzioni`;

  constructor(private http: HttpClient) {}

  // Lista completa delle manutenzioni
  getAll(): Observable<ManutenzioneDto[]> {
    return this.http.get<ManutenzioneDto[]>(this.apiUrl);
  }

  // Dettaglio di una singola manutenzione
  getById(id: number): Observable<ManutenzioneDto> {
    return this.http.get<ManutenzioneDto>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova manutenzione
  create(dto: ManutenzioneDto): Observable<ManutenzioneDto> {
    return this.http.post<ManutenzioneDto>(this.apiUrl, dto);
  }

  // Aggiorna una manutenzione esistente
  update(id: number, dto: ManutenzioneDto): Observable<ManutenzioneDto> {
    return this.http.put<ManutenzioneDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina una manutenzione (solo ADMIN sul backend)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
