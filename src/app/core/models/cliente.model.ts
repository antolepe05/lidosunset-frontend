// Corrisponde a ClienteDto.java
export interface ClienteDto {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  telefono?: string;
  attiva: boolean;
}
