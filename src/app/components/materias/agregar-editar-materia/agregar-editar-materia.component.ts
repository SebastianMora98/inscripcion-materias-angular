import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMateria } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-editar-materia',
  templateUrl: './agregar-editar-materia.component.html',
  styleUrls: ['./agregar-editar-materia.component.css'],
})
export class AgregarEditarMateriaComponent implements OnInit {
  formAgregarEditarMateria: FormGroup;
  materia: IMateria | undefined;

  id: number;
  action = 'Agregar';

  constructor(
    private materiasService: MateriasService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;

    this.formAgregarEditarMateria = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaFinal: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.id !== 0) {
      this.action = 'Editar';
      this.materiasService.getMateria(this.id).subscribe(
        (materia: IMateria) => {
          this.materia = materia;

          this.nombre?.setValue(materia.nombre);
          this.descripcion?.setValue(materia.descripcion);
          this.horaInicio?.setValue(materia.horaInicio);
          this.horaFinal?.setValue(materia.horaFinal);
        },
        (error) => console.error(error)
      );
    }
  }

  agregarEditarMateria() {
    if (this.formAgregarEditarMateria.valid) {
      const { nombre, descripcion, horaInicio, horaFinal } =
        this.formAgregarEditarMateria.value;

      console.log(horaInicio);

      if (this.materia == undefined) {
        /** Agregar materia */
        const materia: IMateria = {
          nombre,
          descripcion,
          horaInicio,
          horaFinal,
        };
        this.materiasService.saveMateria(materia).subscribe(
          (materia: IMateria) => {
            this.router.navigate(['/listar-materias']);
            this.toastr.success(
              'Materia creada satisfactoriamente',
              'Materia Creada',
              {
                closeButton: true,
              }
            );
          },
          (error) => {
            this.toastr.error('Ocurrio un error al crear la materia', 'Error', {
              closeButton: true,
            });
            console.error(error);
          }
        );
      } else {
        /** Editar Materia */
        const alumno: IMateria = {
          id: this.materia.id,
          nombre,
          descripcion,
          horaInicio,
          horaFinal,
        };
        this.materiasService.editMateria(this.id, alumno).subscribe(
          (materia: IMateria) => {
            this.toastr.success(
              'Materia editada satisfactoriamente',
              'Materia Editada',
              {
                closeButton: true,
              }
            );
            this.router.navigate(['/listar-materias']);
          },
          (error) => {
            this.toastr.error(
              'Ocurrio un error al editar la materia',
              'Error',
              {
                closeButton: true,
              }
            );
            console.error(error);
          }
        );
      }
    }
  }

  get nombre() {
    return this.formAgregarEditarMateria.get('nombre');
  }
  get descripcion() {
    return this.formAgregarEditarMateria.get('descripcion');
  }
  get horaInicio() {
    return this.formAgregarEditarMateria.get('horaInicio');
  }
  get horaFinal() {
    return this.formAgregarEditarMateria.get('horaFinal');
  }
}
