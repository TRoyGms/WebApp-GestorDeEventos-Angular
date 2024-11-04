export interface Evento {
    id: number;
    nombre: string;
    fecha: string;
    hora: string;
    tipo: 'conferencia' | 'taller' | 'curso';
    id_localizacion: number;
    capacidad_maxima: number;
    descripcion: string;
  }
  