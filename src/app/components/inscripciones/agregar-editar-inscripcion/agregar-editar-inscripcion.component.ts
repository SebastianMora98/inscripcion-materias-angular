import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IInscripcion } from 'src/app/interfaces/inscripcion';

import { ToastrService } from 'ngx-toastr';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { MateriasService } from 'src/app/services/materias.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { IMateria } from 'src/app/interfaces/materia';
import { IAlumno } from 'src/app/interfaces/alumno';

@Component({
  selector: 'app-agregar-editar-inscripcion',
  templateUrl: './agregar-editar-inscripcion.component.html',
  styleUrls: ['./agregar-editar-inscripcion.component.css'],
})
export class AgregarEditarInscripcionComponent implements OnInit {
  formAgregarEditarInscripcion: FormGroup;
  inscripcion: IInscripcion | undefined;

  idAlumno: number;
  idMateria: number;
  action = 'Agregar';

  alumnos: IAlumno[] | undefined;
  alumnoSeleccionado: IAlumno | undefined;
  materias: IMateria[] | undefined;
  materiaSeleccionada: IMateria | undefined;

  constructor(
    private inscripcionService: InscripcionesService,
    private materiasService: MateriasService,
    private alumnosService: AlumnosService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.idAlumno = +this.aRoute.snapshot.paramMap.get('idAlumno')!;
    this.idMateria = +this.aRoute.snapshot.paramMap.get('idMateria')!;

    this.formAgregarEditarInscripcion = new FormGroup({
      alumno: new FormControl(null, [Validators.required]),
      materia: new FormControl(null, [Validators.required]),
    });

    this.alumno?.valueChanges.subscribe((data) => {
      console.log({ data });
    });
    this.materia?.valueChanges.subscribe((data) => {
      console.log({ data });
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getAlumnos();
    await this.getMaterias();
    this.esEditar();
  }

  async getAlumnos() {
    try {
      this.alumnos = await this.alumnosService.getListAlumnos().toPromise();
    } catch (error) {
      this.toastr.error('Ocurrio un error al obtener los alumnos', 'Error', {
        closeButton: true,
      });
      console.error(error);
    }
  }

  async getMaterias() {
    try {
      this.materias = await this.materiasService.getListMaterias().toPromise();
    } catch (error) {
      this.toastr.error('Ocurrio un error al obtener las materias', 'Error', {
        closeButton: true,
      });
      console.error(error);
    }
  }

  cambiarAlumno(e: any) {
    console.log(e.target.value);
    this.alumno?.setValue(e.target.value);
  }
  cambiarMateria(e: any) {
    this.materia?.setValue(e.target.value);
  }

  esEditar() {
    if (this.idAlumno !== 0 && this.idMateria != 0) {
      this.action = 'Editar';
      this.inscripcionService
        .getInscripcion(this.idAlumno, this.idMateria)
        .subscribe(
          (inscripcion: IInscripcion) => {
            this.inscripcion = inscripcion;
            const alumno = this.alumnos?.find(
              (alumno) => alumno.id === this.inscripcion?.alumno?.id
            );
            const materia = this.materias?.find(
              (materia) => materia.id === this.inscripcion?.materia?.id
            );

            if (alumno) {
              this.alumno?.setValue(alumno);
            }
            if (materia) {
              this.materia?.setValue(materia);
            }
          },
          (error) => console.error(error)
        );
    }
  }

  agregarEditarInscripcion() {
    console.log('agregar');

    if (this.formAgregarEditarInscripcion.valid) {
      const { alumno, materia } = this.formAgregarEditarInscripcion.value;

      if (this.inscripcion == undefined) {
        /** Agregar inscripcion */
        this.inscripcionService
          .saveInscripcion(alumno.id, materia.id)
          .subscribe(
            (alumno: IInscripcion) => {
              this.router.navigate(['/listar-inscripciones']);
              this.toastr.success(
                'Inscripción creada satisfactoriamente',
                'Inscripción Creada',
                {
                  closeButton: true,
                }
              );
            },
            (error) => {
              this.toastr.error(
                'Ocurrio un error al crear la inscripción',
                'Error',
                {
                  closeButton: true,
                }
              );
              console.error(error);
            }
          );
      } else {
        /** Editar Inscripcion */
        const inscripcion: IInscripcion = {
          alumnoId: this.inscripcion.alumnoId,
          materiaId: this.inscripcion.materiaId,
          alumno,
          materia,
          fechaCreacion: this.inscripcion.fechaCreacion,
        };
        console.log(inscripcion);

        this.inscripcionService
          .editInscripcion(
            this.inscripcion.alumnoId,
            this.inscripcion.materiaId,
            inscripcion
          )
          .subscribe(
            (alumno: IInscripcion) => {
              this.toastr.success(
                'Inscripción editada satisfactoriamente',
                'Inscripción Editada',
                {
                  closeButton: true,
                }
              );
              this.router.navigate(['/listar-inscripciones']);
            },
            (error) => {
              if (error.status === 500) {
                this.toastr.error(error.error.detail, 'Error', {
                  closeButton: true,
                });
                console.error(error);
              } else {
                this.toastr.error(
                  'Ocurrio un error al editar la inscripción',
                  'Error',
                  {
                    closeButton: true,
                  }
                );
                console.error(error);
              }
            }
          );
      }
    }
  }

  get alumno() {
    return this.formAgregarEditarInscripcion.get('alumno');
  }
  get materia() {
    return this.formAgregarEditarInscripcion.get('materia');
  }
}
