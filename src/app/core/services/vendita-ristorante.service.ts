import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { VenditaRistoranteDto } from '../models/vendita-ristorante.model';


//Service per la vendita ristorante
@Injectable({
  providedIn: 'root'
})
export class VenditaRistoranteService {

  private readonly apiUrl = `${environment.apiUrl}/vendite-ristorante`;

  constructor(private http: HttpClient) {}

  // Lista completa delle vendite
  getAll(): Observable<VenditaRistoranteDto[]> {
    return this.http.get<VenditaRistoranteDto[]>(this.apiUrl);
  }

  // Dettaglio di una singola vendita
  getById(id: number): Observable<VenditaRistoranteDto> {
    return this.http.get<VenditaRistoranteDto>(`${this.apiUrl}/${id}`);
  }

  // Registra una nuova vendita
  create(dto: VenditaRistoranteDto): Observable<VenditaRistoranteDto> {
    return this.http.post<VenditaRistoranteDto>(this.apiUrl, dto);
  }

  // Aggiorna una vendita esistente
  update(id: number, dto: VenditaRistoranteDto): Observable<VenditaRistoranteDto> {
    return this.http.put<VenditaRistoranteDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina (disattiva) una vendita
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
