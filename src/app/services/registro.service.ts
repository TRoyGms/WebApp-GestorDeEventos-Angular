import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro, RegistroCreate } from '../models/registro'; // Import both interfaces

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/registros/';

  constructor(private http: HttpClient) {}

  obtenerRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.apiUrl);
  }

  agregarRegistro(registro: RegistroCreate): Observable<Registro> { // Use RegistroCreate here
    return this.http.post<Registro>(this.apiUrl, registro);
  }

  editarRegistro(registro: Registro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${registro.id}`, registro);
  }

  eliminarRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
