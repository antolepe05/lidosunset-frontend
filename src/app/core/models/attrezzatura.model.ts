// Corrisponde a TipoAttrezzatura.java (enum)
export enum TipoAttrezzatura {
  CANOA = 'CANOA',
  PEDALO = 'PEDALO',
  JETSKI = 'JETSKI'
}

// Corrisponde a StatoAttrezzatura.java (enum)
export enum StatoAttrezzatura {
  DISPONIBILE = 'DISPONIBILE',
  PRENOTATA = 'PRENOTATA',
  IN_MANUTENZIONE = 'IN_MANUTENZIONE'
}

// Corrisponde a AttrezzaturaDto.java
export interface AttrezzaturaDto {
  id?: number;
  nome: string;
  tipo: TipoAttrezzatura;
  stato: StatoAttrezzatura;
  descrizione?: string;
  attiva: boolean;
}
