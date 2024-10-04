export class Participante {
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    edad: number;

    // Constructor para inicializar las propiedades
    constructor(nombre: string, apellidos: string, correo: string, telefono: string, edad: number) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.telefono = telefono;
        this.edad = edad;
    }
}
