import { IAlumno } from './alumno';
import { IMateria } from './materia';

export interface IInscripcion {
  id?: number;
  alumnoId: number;
  materiaId: number;
  alumno?: IAlumno;
  materia?: IMateria;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}
