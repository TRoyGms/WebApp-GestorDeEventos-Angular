// registro.model.ts
export interface RegistroCreate {
    id_evento: number;
    id_participante: number;
    estado?: string; // Optional, defaults to 'pendiente' in your API
  }
  
  // Define the complete Registro interface which includes the id
  export interface Registro extends RegistroCreate {
    id: number; // This includes the id for the existing registros
  }
  