import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PrenotazioneDto } from '../models/prenotazione.model';


// Service per la prenotazione
@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private readonly apiUrl = `${environment.apiUrl}/prenotazioni`;

  constructor(private http: HttpClient) {}

  // ==== Metodi per lo STAFF (ADMIN/ISTRUTTORE) ====

  // Lista di tutte le prenotazioni (solo ADMIN/ISTRUTTORE)
  getAll(): Observable<PrenotazioneDto[]> {
    return this.http.get<PrenotazioneDto[]>(this.apiUrl);
  }

  // Dettaglio di una prenotazione per ID
  getById(id: number): Observable<PrenotazioneDto> {
    return this.http.get<PrenotazioneDto>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova prenotazione per conto di un cliente
  create(dto: PrenotazioneDto): Observable<PrenotazioneDto> {
    return this.http.post<PrenotazioneDto>(this.apiUrl, dto);
  }

  // Modifica una prenotazione esistente
  update(id: number, dto: PrenotazioneDto): Observable<PrenotazioneDto> {
    return this.http.put<PrenotazioneDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Annulla (elimina) una prenotazione
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ==== Metodi per il CLIENTE (le proprie prenotazioni) ====

  // Lista delle proprie prenotazioni
  getMie(): Observable<PrenotazioneDto[]> {
    return this.http.get<PrenotazioneDto[]>(`${this.apiUrl}/mie`);
  }

  // Dettaglio di una propria prenotazione
  getMiaById(id: number): Observable<PrenotazioneDto> {
    return this.http.get<PrenotazioneDto>(`${this.apiUrl}/mie/${id}`);
  }

  // Crea una nuova prenotazione personale
  createMia(dto: PrenotazioneDto): Observable<PrenotazioneDto> {
    return this.http.post<PrenotazioneDto>(`${this.apiUrl}/mie`, dto);
  }

  // Modifica una propria prenotazione
  updateMia(id: number, dto: PrenotazioneDto): Observable<PrenotazioneDto> {
    return this.http.put<PrenotazioneDto>(`${this.apiUrl}/mie/${id}`, dto);
  }

  // Annulla una propria prenotazione
  deleteMia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mie/${id}`);
  }
}
