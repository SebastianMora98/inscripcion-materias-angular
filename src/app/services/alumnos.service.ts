import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private baseUrl = environment.api_endpoint;
  private apiAlumnos = 'api/alumnos/';

  constructor(private http: HttpClient) {}

  getListAlumnos(): Observable<IAlumno[]> {
    return this.http.get<IAlumno[]>(this.baseUrl + this.apiAlumnos);
  }

  getAlumno(id: number): Observable<IAlumno> {
    return this.http.get<IAlumno>(this.baseUrl + this.apiAlumnos + id);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.apiAlumnos + id);
  }

  saveAlumno(alumno: IAlumno): Observable<IAlumno> {
    return this.http.post<IAlumno>(this.baseUrl + this.apiAlumnos, alumno);
  }

  editAlumno(id: number, alumno: IAlumno): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.apiAlumnos + id, alumno);
  }
}
