// Corrisponde a TipoManutenzione.java (enum)
export enum TipoManutenzione {
  PREVENTIVA = 'PREVENTIVA',
  ORDINARIA = 'ORDINARIA',
  URGENTE = 'URGENTE'
}

// Corrisponde a ManutenzioneDto.java
export interface ManutenzioneDto {
  id?: number;
  data: string;          // LocalDate → stringa ISO (es. "2026-07-01")
  descrizione: string;
  tipo: TipoManutenzione;
  completata: boolean;
  note?: string;
  attiva: boolean;
  costo?: number;
  attrezzaturaId: number;
  attrezzaturaNome?: string;
}
