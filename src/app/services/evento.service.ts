import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
    providedIn: 'root',
})
export class EventoService {
    private eventos: Evento[] = []; // Almacena la lista de eventos 

    // Método para agregar un nuevo evento
    agregarEvento(evento: Evento) {
        this.eventos.push(evento);
    }

    // Método para obtener todos los eventos
    obtenerEventos(): Evento[] {
        return this.eventos;
    }

   
}
