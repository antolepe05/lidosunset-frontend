// Corrisponde a DashboardDatiDto.java
export interface DashboardDatiDto {
  incassoTotalePrenotazioni: number;
  incassoTotaleRistorante: number;
  totaleSpeseRistorante: number;
  totaleSpeseAttrezzature: number;
  totaleSpeseManutenzione: number;
  margineNetto: number;
  totaleAttrezzatura: number;
  contatoriPerStato: { [key: string]: number };
  manutenzioniUrgentiAttive: number;
}
