import { Component, OnInit, Inject } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { LocalizacionService } from '../../services/localizaciones.service';
import { Localizacion } from '../../models/localizacion';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  eventos: Evento[] = [];
  localizaciones: Localizacion[] = [];
  nuevoEvento: Evento = {
    id: 0,
    nombre: '',
    fecha: '',
    hora: '',
    tipo: 'conferencia',
    id_localizacion: 0,
    capacidad_maxima: 0,
    descripcion: ''
  };

  constructor(
    private eventoService: EventoService,
    @Inject(LocalizacionService) private localizacionService: LocalizacionService // Usar @Inject
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

  agregarEvento(): void {
    this.eventoService.agregarEvento(this.nuevoEvento).subscribe(() => {
      this.nuevoEvento = {
        id: 0,
        nombre: '',
        fecha: '',
        hora: '',
        tipo: 'conferencia',
        id_localizacion: 0,
        capacidad_maxima: 0,
        descripcion: ''
      };
      this.cargarEventos();
    });
  }
}
