import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMateria } from '../interfaces/materia';
@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private baseUrl = environment.api_endpoint;
  private apiAlumnos = 'api/materias/';

  constructor(private http: HttpClient) {}

  getListMaterias(): Observable<IMateria[]> {
    return this.http.get<IMateria[]>(this.baseUrl + this.apiAlumnos);
  }

  getMateria(id: number): Observable<IMateria> {
    return this.http.get<IMateria>(this.baseUrl + this.apiAlumnos + id);
  }

  deleteMateria(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.apiAlumnos + id);
  }

  saveMateria(alumno: IMateria): Observable<IMateria> {
    return this.http.post<IMateria>(this.baseUrl + this.apiAlumnos, alumno);
  }

  editMateria(id: number, alumno: IMateria): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.apiAlumnos + id, alumno);
  }
}
