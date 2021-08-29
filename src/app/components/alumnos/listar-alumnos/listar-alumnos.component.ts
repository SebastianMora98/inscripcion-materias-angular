import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAlumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css'],
})
export class ListarAlumnosComponent implements OnInit {
  alumnos: IAlumno[] = [];

  constructor(
    private alumnosService: AlumnosService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos() {
    this.alumnosService.getListAlumnos().subscribe(
      (alumnos) => (this.alumnos = alumnos),
      (error) => {
        this.toastr.error('Ocurrio un error al obtener los alumnos', 'Error', {
          closeButton: true,
        });
        console.error(error);
      }
    );
  }

  deleteAlumno(id: any) {
    this.alumnosService.deleteAlumno(id).subscribe(
      (data) => {
        this.toastr.success(
          'Alumno eliminada satisfactoriamente',
          'Alumno Eliminado',
          {
            closeButton: true,
          }
        );

        this.getAlumnos();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al eliminar el alumno', 'Error', {
          closeButton: true,
        });
        console.error(error);
      }
    );
  }
}
