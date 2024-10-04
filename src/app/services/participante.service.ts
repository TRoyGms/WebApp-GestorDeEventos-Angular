import { Injectable } from '@angular/core';
import { Participante } from '../models/participante';

@Injectable({
    providedIn: 'root',
})
export class ParticipanteService {
    private participantes: Participante[] = []; // Almacena la lista de participantes

    // Método para agregar un nuevo participante
    agregarParticipante(participante: Participante) {
        this.participantes.push(participante);
    }

    // Método para obtener todos los participantes
    obtenerParticipantes(): Participante[] {
        return this.participantes;
    }

   
}
