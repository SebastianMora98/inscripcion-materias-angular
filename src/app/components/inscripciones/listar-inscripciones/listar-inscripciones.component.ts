import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IInscripcion } from 'src/app/interfaces/inscripcion';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.css'],
})
export class ListarInscripcionesComponent implements OnInit {
  inscripciones: IInscripcion[] = [];

  constructor(
    private inscripcionesService: InscripcionesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getInscripciones();
  }

  getInscripciones() {
    this.inscripcionesService.getListInscripciones().subscribe(
      (inscripciones) => (this.inscripciones = inscripciones),
      (error) => {
        this.toastr.error(
          'Ocurrio un error al obtener las inscripciones',
          'Error',
          {
            closeButton: true,
          }
        );
        console.error(error);
      }
    );
  }

  deleteInscripcion(alumnoId: number, materiaId: number) {
    this.inscripcionesService.deleteInscripcion(alumnoId, materiaId).subscribe(
      (data) => {
        this.toastr.success(
          'Inscripción eliminada satisfactoriamente',
          'Inscripción Eliminada',
          {
            closeButton: true,
          }
        );

        this.getInscripciones();
      },
      (error) => {
        this.toastr.error(
          'Ocurrio un error al eliminar la inscripción',
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
