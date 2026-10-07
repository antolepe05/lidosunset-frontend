// Corrisponde a VenditaRistoranteDto.java
export interface VenditaRistoranteDto {
  id?: number;
  data: string;   // LocalDate → stringa ISO
  totale: number;
  note?: string;
  attiva: boolean;
}
