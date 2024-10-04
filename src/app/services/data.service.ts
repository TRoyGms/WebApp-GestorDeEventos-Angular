import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { Participante } from '../models/participante';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private eventosKey = 'eventos'; // Clave para almacenar eventos
  private participantesKey = 'participantes'; // Clave para almacenar participantes

  constructor() { }

  // Método para guardar un nuevo evento
  agregarEvento(evento: Evento) {
    const eventos = this.obtenerEventos();
    const nuevoId = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1; // Incrementar el id
    evento.id = nuevoId; // Asignar el nuevo id
    eventos.push(evento);
    localStorage.setItem(this.eventosKey, JSON.stringify(eventos));
  }


  // Método para obtener todos los eventos
  obtenerEventos(): Evento[] {
    const eventos = localStorage.getItem(this.eventosKey);
    return eventos ? JSON.parse(eventos) : [];
  }

  // Método para editar un evento
  editarEvento(eventoEditado: Evento) {
    const eventos = this.obtenerEventos();
    const index = eventos.findIndex(evento => evento.id === eventoEditado.id);
    if (index !== -1) {
        eventos[index] = eventoEditado;
        localStorage.setItem(this.eventosKey, JSON.stringify(eventos));
    }
  }

  // Método para eliminar un evento
  eliminarEvento(nombreEvento: string) {
    let eventos = this.obtenerEventos(); // Obtenemos los eventos actuales
    eventos = eventos.filter(evento => evento.nombre !== nombreEvento);
    localStorage.setItem(this.eventosKey, JSON.stringify(eventos)); // Actualiza el LocalStorage
  }

  // Método para guardar un nuevo participante
  agregarParticipante(participante: Participante) {
    const participantes = this.obtenerParticipantes();
    const nuevoId = participantes.length > 0 ? participantes[participantes.length - 1].id + 1 : 1; // Incrementar el id
    participante.id = nuevoId; // Asignar el nuevo id
    participantes.push(participante);
    localStorage.setItem(this.participantesKey, JSON.stringify(participantes));
  }
  

  // Método para obtener todos los participantes
  obtenerParticipantes(): Participante[] {
    const participantes = localStorage.getItem(this.participantesKey);
    return participantes ? JSON.parse(participantes) : [];
  }

  // Método para editar un participante
  editarParticipante(participanteEditado: Participante) {
    const participantes = this.obtenerParticipantes();
    const index = participantes.findIndex(p => p.id === participanteEditado.id); // Buscar por id
  
    if (index !== -1) {
      participantes[index] = { ...participanteEditado }; // Actualizar el participante en la lista
      localStorage.setItem(this.participantesKey, JSON.stringify(participantes)); // Guardar los cambios en localStorage
    } else {
      console.error('Participante no encontrado para editar:', participanteEditado);
    }
  }
   

  // Método para eliminar un participante
  eliminarParticipante(id: number) {
    let participantes = this.obtenerParticipantes(); // Obtener los participantes actuales
    participantes = participantes.filter(participante => participante.id !== id); // Filtrar por id
    localStorage.setItem(this.participantesKey, JSON.stringify(participantes)); // Actualiza el LocalStorage
  }
  
}
