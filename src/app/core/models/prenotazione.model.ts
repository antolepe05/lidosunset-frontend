// Corrisponde a StatoPrenotazione.java (enum)
export enum StatoPrenotazione {
  ATTIVA = 'ATTIVA',
  COMPLETATA = 'COMPLETATA',
  ANNULLATA = 'ANNULLATA'
}

// Corrisponde a PrenotazioneDto.java
export interface PrenotazioneDto {
  id?: number;
  dataInizio: string;     // LocalDate → stringa ISO (es. "2026-07-01")
  oraInizio: string;      // LocalTime → stringa (es. "10:00")
  oraFine: string;        // LocalTime → stringa (es. "12:00")
  stato: StatoPrenotazione;
  attiva: boolean;
  prezzo?: number;
  clienteId: number;
  nome?: string;          // nome del cliente (flat, popolato dal backend)
  cognome?: string;       // cognome del cliente (flat, popolato dal backend)
  attrezzaturaId: number;
  attrezzaturaNome?: string;
}
