import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { ParticipanteService } from '../../services/participante.service';
import { EventoService } from '../../services/evento.service';
import { Registro, RegistroCreate } from '../../models/registro';
import { Participante } from '../../models/participante';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registros: Registro[] = [];
  nuevoRegistro: RegistroCreate = {
    id_evento: 0,
    id_participante: 0,
    estado: 'pendiente',
  };
  participantes: Participante[] = [];
  eventos: Evento[] = [];
  editandoRegistro: boolean = false;
  registroEnEdicion: Registro | null = null;

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
    if (this.editandoRegistro && this.registroEnEdicion) {
      this.registroService.editarRegistro(this.registroEnEdicion.id, this.nuevoRegistro).subscribe(
        () => {
          this.obtenerRegistros();
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al editar registro', error);
        }
      );
    } else {
      this.registroService.agregarRegistro(this.nuevoRegistro).subscribe(
        () => {
          this.obtenerRegistros();
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al agregar registro', error);
        }
      );
    }
  }

  editarRegistro(registro: Registro): void {
    this.nuevoRegistro = {
      id_evento: registro.id_evento,
      id_participante: registro.id_participante,
      estado: registro.estado,
    };
    this.registroEnEdicion = registro;
    this.editandoRegistro = true;
  }

  eliminarRegistro(id: number): void {
    this.registroService.eliminarRegistro(id).subscribe(
      () => {
        this.obtenerRegistros();
      },
      (error) => {
        console.error('Error al eliminar registro', error);
      }
    );
  }

  resetFormulario(): void {
    this.nuevoRegistro = {
      id_evento: 0,
      id_participante: 0,
      estado: 'pendiente',
    };
    this.editandoRegistro = false;
    this.registroEnEdicion = null;
  }

  obtenerNombreEvento(idEvento: number): string {
    const evento = this.eventos.find(e => e.id === idEvento);
    return evento ? evento.nombre : 'Desconocido';
  }

  obtenerNombreParticipante(idParticipante: number): string {
    const participante = this.participantes.find(p => p.id === idParticipante);
    return participante ? `${participante.nombre} ${participante.apellidos}` : 'Desconocido';
  }
}
