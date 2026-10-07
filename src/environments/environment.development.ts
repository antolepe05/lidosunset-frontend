// Configurazione per l'ambiente di sviluppo. senza questo file, ogni service Angular dovrebbe scrivere http://localhost:8080/api
// direttamente nel proprio codice.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'

};
