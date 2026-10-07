// Corrisponde a SettoreFornitore.java (enum)
export enum SettoreFornitore {
  ATTREZZATURE_SPORTIVE = 'ATTREZZATURE_SPORTIVE',
  RISTORAZIONE = 'RISTORAZIONE'
}

// Corrisponde a FornitoreDto.java
export interface FornitoreDto {
  id?: number;
  nome: string;
  partitaIva: string;
  email: string;
  telefono?: string;
  indirizzo?: string;
  settore: SettoreFornitore;
  attiva: boolean;
}
