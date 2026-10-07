import { TipoAttrezzatura } from './attrezzatura.model';

// Corrisponde a StatoAcquisto.java (enum)
export enum StatoAcquisto {
  IN_ATTESA = 'IN_ATTESA',
  RICEVUTO = 'RICEVUTO',
  ANNULLATO = 'ANNULLATO'
}

// Corrisponde a RigaAcquistoAttrezzaturaDto.java
export interface RigaAcquistoAttrezzaturaDto {
  id?: number;
  tipoAttrezzatura: TipoAttrezzatura;
  quantita: number;
  prezzoUnitario: number;
  prezzoTotale: number;
  note?: string;
}

// Corrisponde a AcquistoAttrezzaturaDto.java
export interface AcquistoAttrezzaturaDto {
  id?: number;
  dataOrdine: string;       // LocalDate → stringa ISO
  dataRicezione?: string;
  prezzoTotale?: number;
  stato: StatoAcquisto;
  note?: string;
  attiva: boolean;
  fornitoreId: number;
  righe: RigaAcquistoAttrezzaturaDto[];
}
