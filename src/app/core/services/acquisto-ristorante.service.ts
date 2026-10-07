import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AcquistoRistoranteDto } from '../models/acquisto-ristorante.model';

// Service per gli acquisti ristorante.

@Injectable({
  providedIn: 'root'
})
export class AcquistoRistoranteService {

  private readonly apiUrl = `${environment.apiUrl}/acquisti-ristorante`;

  constructor(private http: HttpClient) {}

  // Recupera tutti gli acquisti ristorante
  getAll(): Observable<AcquistoRistoranteDto[]> {
    return this.http.get<AcquistoRistoranteDto[]>(this.apiUrl);
  }

  // Recupera il dettaglio di un singolo acquisto
  getById(id: number): Observable<AcquistoRistoranteDto> {
    return this.http.get<AcquistoRistoranteDto>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuovo acquisto
  create(dto: AcquistoRistoranteDto): Observable<AcquistoRistoranteDto> {
    return this.http.post<AcquistoRistoranteDto>(this.apiUrl, dto);
  }

  // Aggiorna un acquisto esistente
  update(id: number, dto: AcquistoRistoranteDto): Observable<AcquistoRistoranteDto> {
    return this.http.put<AcquistoRistoranteDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina (disattiva) un acquisto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
