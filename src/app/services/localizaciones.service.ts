import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localizacion } from '../models/localizacion'; // Asegúrate de que este modelo esté definido

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio esté disponible en toda la aplicación
})
export class LocalizacionService {
  private apiUrl = 'http://127.0.0.1:8000/localizaciones/'; // Cambia esto a tu URL de API real

  constructor(private http: HttpClient) {}

  obtenerLocalizaciones(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.apiUrl);
  }
}
