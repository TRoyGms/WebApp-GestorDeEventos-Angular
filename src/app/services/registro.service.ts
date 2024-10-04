import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';

@Injectable({
    providedIn: 'root',
})
export class RegistroService {
    private registros: Registro[] = []; // Almacena la lista de registros

    // Método para agregar un nuevo registro
    agregarRegistro(registro: Registro) {
        this.registros.push(registro);
    }

    // Método para obtener todos los registros
    obtenerRegistros(): Registro[] {
        return this.registros;
    }
}
