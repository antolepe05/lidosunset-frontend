// Corrisponde a Role.java (enum)
export enum Role {
  ADMIN = 'ADMIN',
  ISTRUTTORE = 'ISTRUTTORE',
  BARISTA = 'BARISTA',
  CLIENTE = 'CLIENTE'
}

// Corrisponde a LoginRequest.java
export interface LoginRequest {
  username: string;
  password: string;
}

// Corrisponde a RegisterRequest.java
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  nome: string;
  cognome: string;
  telefono?: string;
}

// Corrisponde a AuthResponse.java
export interface AuthResponse {
  token: string;
  username: string;
  ruolo: string;
  expiresInMs: number;
}
