import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-editar-alumno',
  templateUrl: './agregar-editar-alumno.component.html',
  styleUrls: ['./agregar-editar-alumno.component.css'],
})
export class AgregarEditarAlumnoComponent implements OnInit {
  formAgregarEditarAlumno: FormGroup;
  alumno: IAlumno | undefined;

  id: number;
  action = 'Agregar';

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;

    this.formAgregarEditarAlumno = new FormGroup({
      identificacion: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.id !== 0) {
      this.action = 'Editar';
      this.alumnosService.getAlumno(this.id).subscribe(
        (alumno: IAlumno) => {
          this.alumno = alumno;
          this.identificacion?.setValue(alumno.identificacion);
          this.nombres?.setValue(alumno.nombres);
          this.apellidos?.setValue(alumno.apellidos);
        },
        (error) => console.error(error)
      );
    }
  }

  agregarEditarAlumno() {
    if (this.formAgregarEditarAlumno.valid) {
      const { identificacion, nombres, apellidos } =
        this.formAgregarEditarAlumno.value;

      if (this.alumno == undefined) {
        /** Agregar alumno */
        const alumno: IAlumno = {
          identificacion,
          nombres,
          apellidos,
        };
        this.alumnosService.saveAlumno(alumno).subscribe(
          (alumno: IAlumno) => {
            this.router.navigate(['/listar-alumnos']);
            this.toastr.success(
              'Alumno creado satisfactoriamente',
              'Alumno Creado',
              {
                closeButton: true,
              }
            );
          },
          (error) => {
            this.toastr.error('Ocurrio un error al crear el alumno', 'Error', {
              closeButton: true,
            });
            console.error(error);
          }
        );
      } else {
        /** Editar Alumno */
        const alumno: IAlumno = {
          id: this.alumno.id,
          identificacion,
          nombres,
          apellidos,
        };
        this.alumnosService.editAlumno(this.id, alumno).subscribe(
          (alumno: IAlumno) => {
            this.toastr.success(
              'Alumno editado satisfactoriamente',
              'Alumno Editado',
              {
                closeButton: true,
              }
            );
            this.router.navigate(['/listar-alumnos']);
          },
          (error) => {
            this.toastr.error('Ocurrio un error al editar el alumno', 'Error', {
              closeButton: true,
            });
            console.error(error);
          }
        );
      }
    }
  }

  get identificacion() {
    return this.formAgregarEditarAlumno.get('identificacion');
  }
  get nombres() {
    return this.formAgregarEditarAlumno.get('nombres');
  }
  get apellidos() {
    return this.formAgregarEditarAlumno.get('apellidos');
  }
}
