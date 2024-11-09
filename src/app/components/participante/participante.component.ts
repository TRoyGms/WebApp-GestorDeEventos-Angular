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
  participanteSeleccionado: Omit<Participante, 'id'> & { id?: number } = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    edad: 0
  };
  modoEdicion: boolean = false;
  mostrarLista: boolean = false; // Nueva variable para controlar la visibilidad de la lista

  constructor(private participanteService: ParticipanteService) {}

  ngOnInit(): void {
    this.cargarParticipantes();
  }

  cargarParticipantes(): void {
    this.participanteService.obtenerParticipantes().subscribe((data: Participante[]) => {
      this.participantes = data;
    });
  }

  toggleLista(): void {
    this.mostrarLista = !this.mostrarLista;
  }

  agregarOEditarParticipante(): void {
    if (this.modoEdicion && this.participanteSeleccionado.id) {
      this.participanteService.editarParticipante(this.participanteSeleccionado as Participante).subscribe(
        () => {
          this.cargarParticipantes();
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al editar participante:', error);
        }
      );
    } else {
      this.participanteService.agregarParticipante(this.participanteSeleccionado).subscribe(
        () => {
          this.cargarParticipantes();
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al agregar participante:', error);
        }
      );
    }
  }

  seleccionarParticipanteParaEditar(participante: Participante): void {
    this.participanteSeleccionado = { ...participante };
    this.modoEdicion = true;
  }

  eliminarParticipante(id: number): void {
    this.participanteService.eliminarParticipante(id).subscribe(
      () => {
        this.cargarParticipantes();
      },
      (error) => {
        console.error('Error al eliminar participante:', error);
      }
    );
  }

  limpiarFormulario(): void {
    this.participanteSeleccionado = {
      nombre: '',
      apellidos: '',
      correo: '',
      telefono: '',
      edad: 0
    };
    this.modoEdicion = false;
  }
}
