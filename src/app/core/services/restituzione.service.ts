import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RestituzioneDto } from '../models/restituzione.model';

// Service per la restituzione
@Injectable({
  providedIn: 'root'
})
export class RestituzioneService {

  private readonly apiUrl = `${environment.apiUrl}/restituzioni`;

  constructor(private http: HttpClient) {}

  // Registra una nuova restituzione
  effettua(dto: RestituzioneDto): Observable<RestituzioneDto> {
    return this.http.post<RestituzioneDto>(this.apiUrl, dto);
  }

  // Aggiorna una restituzione esistente
  aggiorna(id: number, dto: RestituzioneDto): Observable<RestituzioneDto> {
    return this.http.put<RestituzioneDto>(`${this.apiUrl}/${id}`, dto);
  }
}
