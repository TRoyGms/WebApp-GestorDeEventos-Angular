import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro, RegistroCreate } from '../models/registro';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/registros/';

  constructor(private http: HttpClient) {}

  obtenerRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.apiUrl);
  }

  agregarRegistro(registro: RegistroCreate): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrl, registro);
  }

  // Ajuste para el método editarRegistro
  editarRegistro(id: number, registro: RegistroCreate): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}${id}/`, registro);
  }

  eliminarRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
