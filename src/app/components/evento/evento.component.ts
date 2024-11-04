import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { LocalizacionService } from '../../services/localizaciones.service';
import { Localizacion } from '../../models/localizacion';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  eventos: Evento[] = [];
  localizaciones: Localizacion[] = [];
  eventoSeleccionado: Evento = {
    id: 0,
    nombre: '',
    fecha: '',
    hora: '',
    tipo: 'conferencia',
    id_localizacion: 0
  };
  modoEdicion: boolean = false;

  constructor(
    private eventoService: EventoService,
    private localizacionService: LocalizacionService
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarLocalizaciones();
  }

  cargarEventos(): void {
    this.eventoService.obtenerEventos().subscribe((data: Evento[]) => {
      this.eventos = data;
    });
  }

  cargarLocalizaciones(): void {
    this.localizacionService.obtenerLocalizaciones().subscribe(
      (data: Localizacion[]) => {
        this.localizaciones = data;
      },
      (error: any) => {
        console.error('Error al cargar las localizaciones', error);
      }
    );
  }

  seleccionarEventoParaEditar(evento: Evento): void {
    this.eventoSeleccionado = { ...evento }; // Cargar los datos del evento seleccionado
    this.modoEdicion = true;
  }

  agregarOEditarEvento(): void {
    if (this.modoEdicion && this.eventoSeleccionado.id) {
      // Editar evento existente
      this.eventoService.editarEvento(this.eventoSeleccionado).subscribe(() => {
        this.cargarEventos();
        this.limpiarFormulario();
      });
    } else {
      // Agregar nuevo evento
      this.eventoService.agregarEvento(this.eventoSeleccionado).subscribe(() => {
        this.cargarEventos();
        this.limpiarFormulario();
      });
    }
  }

  eliminarEvento(id: number): void {
    this.eventoService.eliminarEvento(id).subscribe(() => {
      this.cargarEventos();
    });
  }

  limpiarFormulario(): void {
    this.eventoSeleccionado = {
      id: 0,
      nombre: '',
      fecha: '',
      hora: '',
      tipo: 'conferencia',
      id_localizacion: 0
    };
    this.modoEdicion = false;
  }
}
