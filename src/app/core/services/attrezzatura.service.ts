import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AttrezzaturaDto, TipoAttrezzatura } from '../models/attrezzatura.model';


// Service per le attrezzature

@Injectable({
  providedIn: 'root'
})
export class AttrezzaturaService {

  private readonly apiUrl = `${environment.apiUrl}/attrezzature`;

  constructor(private http: HttpClient) {}

  // Lista completa del catalogo attrezzature (solo ADMIN/ISTRUTTORE)
  getAll(): Observable<AttrezzaturaDto[]> {
    return this.http.get<AttrezzaturaDto[]>(this.apiUrl);
  }

  // Dettaglio di una singola attrezzatura
  getById(id: number): Observable<AttrezzaturaDto> {
    return this.http.get<AttrezzaturaDto>(`${this.apiUrl}/${id}`);
  }

  // Lista filtrata per tipo - accessibile anche al CLIENTE.
  // Per il cliente il backend restituisce i dati "oscurati" (senza stato).
  getByTipo(tipo: TipoAttrezzatura): Observable<AttrezzaturaDto[]> {
    return this.http.get<AttrezzaturaDto[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  // Crea una nuova attrezzatura
  create(dto: AttrezzaturaDto): Observable<AttrezzaturaDto> {
    return this.http.post<AttrezzaturaDto>(this.apiUrl, dto);
  }

  // Modifica un'attrezzatura esistente
  update(id: number, dto: AttrezzaturaDto): Observable<AttrezzaturaDto> {
    return this.http.put<AttrezzaturaDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Elimina un'attrezzatura
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
