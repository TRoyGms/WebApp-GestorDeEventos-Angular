import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { ParticipanteService } from '../../services/participante.service';
import { EventoService } from '../../services/evento.service';
import { Registro, RegistroCreate } from '../../models/registro'; // Import both interfaces
import { Participante } from '../../models/participante';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registros: Registro[] = [];
  nuevoRegistro: RegistroCreate = { // Use RegistroCreate for new record
    id_evento: 0,
    id_participante: 0,
    estado: 'pendiente',
  };
  participantes: Participante[] = [];
  eventos: Evento[] = [];

  constructor(
    private registroService: RegistroService,
    private participanteService: ParticipanteService,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros();
    this.obtenerParticipantes();
    this.obtenerEventos();
  }

  obtenerRegistros(): void {
    this.registroService.obtenerRegistros().subscribe(
      (data: Registro[]) => {
        this.registros = data;
      },
      (error) => {
        console.error('Error al obtener registros', error);
      }
    );
  }

  obtenerParticipantes(): void {
    this.participanteService.obtenerParticipantes().subscribe(
      (data: Participante[]) => {
        this.participantes = data;
      },
      (error) => {
        console.error('Error al obtener participantes', error);
      }
    );
  }

  obtenerEventos(): void {
    this.eventoService.obtenerEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al obtener eventos', error);
      }
    );
  }

  agregarRegistro(): void {
    this.registroService.agregarRegistro(this.nuevoRegistro).subscribe(
      (response) => {
        this.obtenerRegistros(); // Actualizar la lista de registros
        this.nuevoRegistro = {
          id_evento: 0,
          id_participante: 0,
          estado: 'pendiente',
        };
      },
      (error) => {
        console.error('Error al agregar registro', error);
      }
    );
  }
}
