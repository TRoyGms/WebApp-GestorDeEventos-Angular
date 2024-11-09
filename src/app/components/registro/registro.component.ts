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
  mensajeError: string = '';
  eventoExpandido: { [key: number]: boolean } = {};

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
    if (this.esRegistroDuplicado(this.nuevoRegistro.id_evento, this.nuevoRegistro.id_participante)) {
      this.mensajeError = 'El participante ya está registrado en este evento.';
      alert(this.mensajeError);  // Muestra una alerta si ya existe en la lista local
      return;
    }
  
    if (this.editandoRegistro && this.registroEnEdicion) {
      this.registroService.editarRegistro(this.registroEnEdicion.id, this.nuevoRegistro).subscribe(
        () => {
          this.obtenerRegistros();
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al editar registro', error);
          alert("Ocurrió un error al editar el registro.");
        }
      );
    } else {
      this.registroService.agregarRegistro(this.nuevoRegistro).subscribe(
        () => {
          this.obtenerRegistros();
          this.resetFormulario();
        },
        (error) => {
          if (error.status === 400 && error.error.detail === "El participante ya está registrado en este evento.") {
            // Muestra la alerta en caso de error de duplicado
            alert("El participante ya está registrado en este evento.");
          } else {
            console.error('Error al agregar registro', error);
            alert("Ocurrió un error al agregar el registro.");
          }
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
    this.mensajeError = '';
  }

  obtenerRegistrosPorEvento(idEvento: number): Registro[] {
    return this.registros.filter(registro => registro.id_evento === idEvento);
  }

  obtenerNombreParticipante(idParticipante: number): string {
    const participante = this.participantes.find(p => p.id === idParticipante);
    return participante ? `${participante.nombre} ${participante.apellidos}` : 'Desconocido';
  }

  toggleEvento(idEvento: number): void {
    this.eventoExpandido[idEvento] = !this.eventoExpandido[idEvento];
  }

  esRegistroDuplicado(idEvento: number, idParticipante: number): boolean {
    return this.registros.some(
      registro => registro.id_evento === idEvento && registro.id_participante === idParticipante
    );
  }

  puedeAgregarRegistro(): boolean {
    // Validar si el participante ya está registrado en el mismo evento
    return !this.esRegistroDuplicado(this.nuevoRegistro.id_evento, this.nuevoRegistro.id_participante);
  }
}
