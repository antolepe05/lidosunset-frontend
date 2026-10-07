import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AcquistoAttrezzaturaDto } from '../models/acquisto-attrezzatura.model';

// SErvice HTTP per gli acquisti di attrezzature.
@Injectable({
  providedIn: 'root'
})
export class AcquistoAttrezzaturaService {
  private readonly apiUrl = `${environment.apiUrl}/acquisti-attrezzature`;

  constructor(private http: HttpClient) {}

  // Recupera tutti gli acquisti di attrezzature
  getAll(): Observable<AcquistoAttrezzaturaDto[]> {
    return this.http.get<AcquistoAttrezzaturaDto[]>(this.apiUrl);
  }

  // Recupera il dettaglio di un singolo acquisto
  getById(id: number): Observable<AcquistoAttrezzaturaDto> {
    return this.http.get<AcquistoAttrezzaturaDto>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuovo acquisto
  create(dto: AcquistoAttrezzaturaDto): Observable<AcquistoAttrezzaturaDto> {
    return this.http.post<AcquistoAttrezzaturaDto>(this.apiUrl, dto);
  }

  // Aggiorna un acquisto esistente
  update(id: number, dto: AcquistoAttrezzaturaDto): Observable<AcquistoAttrezzaturaDto> {
    return this.http.put<AcquistoAttrezzaturaDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina (disattiva) un acquisto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
