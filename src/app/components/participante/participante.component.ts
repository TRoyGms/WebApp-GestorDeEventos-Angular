import { Component, OnInit } from '@angular/core';
import { Participante } from '../../models/participante';
import { ParticipanteService } from '../../services/participante.service';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {
  participantes: Participante[] = [];
  nuevoParticipante: Participante = {
    id: 0,
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    edad: 0
  };

  constructor(private participanteService: ParticipanteService) {}

  ngOnInit(): void {
    this.participanteService.obtenerParticipantes().subscribe((data: Participante[]) => {
      this.participantes = data;
    });
  }

  agregarParticipante(): void {
    this.participanteService.agregarParticipante(this.nuevoParticipante);
    this.nuevoParticipante = {
      id: 0,
      nombre: '',
      apellidos: '',
      correo: '',
      telefono: '',
      edad: 0
    };
    
    // Volver a obtener participantes después de agregar uno
    this.participanteService.obtenerParticipantes().subscribe((data: Participante[]) => {
      this.participantes = data;
    });
  }
}
