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
    const participantes = this.obtenerParticipantes(); // Obtenemos los participantes actuales
    const index = participantes.findIndex(participante => participante.correo === participanteEditado.correo);
    if (index !== -1) {
      participantes[index] = participanteEditado;
      localStorage.setItem(this.participantesKey, JSON.stringify(participantes)); // Actualiza el LocalStorage
    }
  }

  // Método para eliminar un participante
  eliminarParticipante(correo: string) {
    let participantes = this.obtenerParticipantes(); // Obtenemos los participantes actuales
    participantes = participantes.filter(participante => participante.correo !== correo);
    localStorage.setItem(this.participantesKey, JSON.stringify(participantes)); // Actualiza el LocalStorage
  }
}
