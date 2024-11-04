import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';
import { Participante } from '../models/participante';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Métodos para Eventos
  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/`);
  }

  agregarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/eventos/`, evento);
  }

  editarEvento(evento: Evento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/eventos/${evento.id}`, evento);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eventos/${id}`);
  }

  // Métodos para Participantes
  obtenerParticipantes(): Observable<Participante[]> {
    return this.http.get<Participante[]>(`${this.apiUrl}/participantes/`);
  }

  agregarParticipante(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(`${this.apiUrl}/participantes/`, participante);
  }

  editarParticipante(participante: Participante): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/participantes/${participante.id}`, participante);
  }

  eliminarParticipante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/participantes/${id}`);
  }
}
