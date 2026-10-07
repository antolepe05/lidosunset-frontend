import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DashboardDatiDto } from '../models/dashboard.model';

// Service per la dashboard
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // Recupera il report giornaliero dal backend
  private readonly apiUrl = `${environment.apiUrl}/admin/dashboard`;

  getReportGiornaliero(): Observable<DashboardDatiDto> {
    return this.http.get<DashboardDatiDto>(`${this.apiUrl}/kpi`);
  }
}
