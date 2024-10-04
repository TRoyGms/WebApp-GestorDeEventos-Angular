export class Participante {
    id: number; // Agregar id
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    edad: number;
  
    constructor(id: number, nombre: string, apellidos: string, correo: string, telefono: string, edad: number) {
      this.id = id; // Inicializa el id
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.correo = correo;
      this.telefono = telefono;
      this.edad = edad;
    }
  }
  