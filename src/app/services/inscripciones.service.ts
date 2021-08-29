import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IInscripcion } from '../interfaces/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private baseUrl = environment.api_endpoint;
  private apiAlumnos = 'api/alumno_materia/';

  constructor(private http: HttpClient) {}

  getListInscripciones(): Observable<IInscripcion[]> {
    return this.http.get<IInscripcion[]>(this.baseUrl + this.apiAlumnos);
  }

  getInscripcion(
    idAlumno: number,
    idMateria: number
  ): Observable<IInscripcion> {
    return this.http.get<IInscripcion>(
      this.baseUrl +
        this.apiAlumnos +
        `byIds?AlumnoId=${idAlumno}&MateriaId=${idMateria}`
    );
  }

  deleteInscripcion(alumnoId: number, materiaId: number): Observable<any> {
    return this.http.delete<any>(
      this.baseUrl + this.apiAlumnos + `${alumnoId}/${materiaId}`
    );
  }

  saveInscripcion(
    alumnoId: number,
    materiaId: number
  ): Observable<IInscripcion> {
    return this.http.post<IInscripcion>(
      this.baseUrl +
        this.apiAlumnos +
        `?AlumnoId=${alumnoId}&MateriaId=${materiaId}`,
      null
    );
  }

  editInscripcion(
    alumnoId: number,
    materiaId: number,
    inscripcion: IInscripcion
  ): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + this.apiAlumnos + `${alumnoId}/${materiaId}`,
      inscripcion
    );
  }
}
