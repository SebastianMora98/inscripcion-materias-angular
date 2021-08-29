import { IAlumno } from './alumno';

export interface IMateria {
  id?: number;
  nombre: string;
  descripcion: string;
  alumnos?: IAlumno[];
  materia?: IMateria;
  horaInicio: string;
  horaFinal: string;
}
