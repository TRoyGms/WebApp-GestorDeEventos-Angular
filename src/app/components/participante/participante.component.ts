import { Component, OnInit } from '@angular/core';
import { Participante } from '../../models/participante';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {
  nuevoParticipante: Participante = new Participante('', '', '', '', 0);
  participantes: Participante[] = [];
  participanteEditando: boolean = false;
  listaVisible: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.participantes = this.dataService.obtenerParticipantes();
  }

  registrarParticipante() {
    if (this.participanteEditando) {
      this.dataService.editarParticipante(this.nuevoParticipante);
    } else {
      this.dataService.agregarParticipante(this.nuevoParticipante);
    }
    this.limpiarFormulario();
  }

  editarParticipante(participante: Participante) {
    this.nuevoParticipante = { ...participante };
    this.participanteEditando = true;
  }

  eliminarParticipante(correo: string) {
    this.dataService.eliminarParticipante(correo);
    this.participantes = this.dataService.obtenerParticipantes();
  }

  limpiarFormulario() {
    this.nuevoParticipante = new Participante('', '', '', '', 0);
    this.participanteEditando = false;
  }

  // Función para validar el formato del correo electrónico
  validarCorreo(correo: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(correo);
  }

  mostrarListaParticipantes() {
    this.listaVisible = !this.listaVisible; // Cambia el estado de la lista
    if (this.listaVisible) {
      this.participantes = this.dataService.obtenerParticipantes(); // Actualiza la lista de participantes si se muestra
    }
  }
}
