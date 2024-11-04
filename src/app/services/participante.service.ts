import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from '../models/participante';

@Injectable({
  providedIn: 'root',
})
export class ParticipanteService {
  private apiUrl = 'http://127.0.0.1:8000/participantes/';

  constructor(private http: HttpClient) {}

  obtenerParticipantes(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.apiUrl);
  }

  agregarParticipante(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(this.apiUrl, participante);
  }

  editarParticipante(participante: Participante): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${participante.id}`, participante);
  }

  eliminarParticipante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
