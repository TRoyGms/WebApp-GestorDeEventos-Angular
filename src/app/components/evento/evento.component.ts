import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  nuevoEvento: Evento = new Evento(0, '', new Date(), '', 0, '');
  eventos: Evento[] = [];
  tipoFiltro: string = '';
  eventoEditando: boolean = false;
  today: Date = new Date(); // Definir la fecha actual

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.eventos = this.dataService.obtenerEventos();
  }

  crearEvento() {
    if (this.eventoEditando) {
      this.dataService.editarEvento(this.nuevoEvento);
    } else {
      this.dataService.agregarEvento(this.nuevoEvento);
    }
    this.limpiarFormulario();
  }

  editarEvento(evento: Evento) {
    this.nuevoEvento = { ...evento };
    this.eventoEditando = true;
  }

  eliminarEvento(nombre: string) {
    this.dataService.eliminarEvento(nombre);
    this.eventos = this.dataService.obtenerEventos(); // Refrescar la lista de eventos
  }

  limpiarFormulario() {
    this.nuevoEvento = new Evento(0, '', new Date(), '', 0, '');
    this.eventoEditando = false;
  }

  get eventosFiltrados(): Evento[] {
    if (this.tipoFiltro) {
      return this.eventos.filter(evento => evento.tipo === this.tipoFiltro);
    }
    return this.eventos;
  }
}
