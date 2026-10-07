import { StatoAcquisto } from './acquisto-attrezzatura.model';

// Corrisponde a RigaAcquistoRistoranteDto.java
export interface RigaAcquistoRistoranteDto {
  id?: number;
  prodotto: string;
  quantita: number;
  prezzoUnitario: number;
  prezzoTotale: number;
  note?: string;
}

// Corrisponde a AcquistoRistoranteDto.java
export interface AcquistoRistoranteDto {
  id?: number;
  dataOrdine: string;       // LocalDate → stringa ISO
  dataRicezione?: string;
  prezzoTotale?: number;
  stato: StatoAcquisto;
  note?: string;
  attiva: boolean;
  fornitoreId: number;
  fornitoreNome?: string;
  righe: RigaAcquistoRistoranteDto[];
}
