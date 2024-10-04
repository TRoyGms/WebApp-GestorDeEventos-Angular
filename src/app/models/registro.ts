export class Registro {
    eventoId: number;
    participanteId: number;
    fechaRegistro: Date;
    estado: string; //(confirmado, pendiente)
    comentarios: string;

    // Constructor para inicializar las propiedades
    constructor(eventoId: number, participanteId: number, fechaRegistro: Date, estado: string, comentarios: string) {
        this.eventoId = eventoId;
        this.participanteId = participanteId;
        this.fechaRegistro = fechaRegistro;
        this.estado = estado;
        this.comentarios = comentarios;
    }
}
