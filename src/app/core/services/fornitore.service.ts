import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FornitoreDto } from '../models/fornitore.model';

// Service per il Fornitore

@Injectable({
  providedIn: 'root'
})
export class FornitoreService {

  private readonly apiUrl = `${environment.apiUrl}/fornitori`;

  constructor(private http: HttpClient) {}

  // Lista completa dei fornitori
  getAll(): Observable<FornitoreDto[]> {
    return this.http.get<FornitoreDto[]>(this.apiUrl);
  }

  // Dettaglio di un singolo fornitore
  getById(id: number): Observable<FornitoreDto> {
    return this.http.get<FornitoreDto>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuovo fornitore
  create(dto: FornitoreDto): Observable<FornitoreDto> {
    return this.http.post<FornitoreDto>(this.apiUrl, dto);
  }

  // Aggiorna un fornitore esistente
  update(id: number, dto: FornitoreDto): Observable<FornitoreDto> {
    return this.http.put<FornitoreDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina (disattiva) un fornitore
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
