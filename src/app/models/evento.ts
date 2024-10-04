export class Evento {
    id: number; // Identificador único
    nombre: string; 
    fecha: Date;
    tipo: string; //(conferencia, taller, curso)
    capacidadMaxima: number; 
    lugar: string; 

    // Constructor para inicializar las propiedades
    constructor(id: number, nombre: string, fecha: Date, tipo: string, capacidadMaxima: number, lugar: string) {
        this.id = id; // Asignar el id
        this.nombre = nombre;
        this.fecha = fecha;
        this.tipo = tipo;
        this.capacidadMaxima = capacidadMaxima;
        this.lugar = lugar;
    }
}
