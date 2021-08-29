import { IMateria } from './materia';

export interface IAlumno {
  id?: number;
  alumno?: IAlumno;
  materias?: IMateria;
  identificacion: string;
  apellidos: string;
  nombres: string;
}
