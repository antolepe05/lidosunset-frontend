// Corrisponde a RestituzioneDto.java
export interface RestituzioneDto {
  id?: number;
  data: string;   // LocalDate → stringa ISO (es. "2026-06-16")
  ora: string;    // LocalTime → stringa (es. "14:30")
  danni: boolean;
  descrizioneDanni?: string;
  prenotazioneId: number;
}
