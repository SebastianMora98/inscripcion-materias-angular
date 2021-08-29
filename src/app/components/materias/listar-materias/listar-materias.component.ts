import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMateria } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrls: ['./listar-materias.component.css'],
})
export class ListarMateriasComponent implements OnInit {
  materias: IMateria[] = [];

  constructor(
    private materiasService: MateriasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.materiasService.getListMaterias().subscribe(
      (materias) => (this.materias = materias),
      (error) => {
        this.toastr.error('Ocurrio un error al obtener las materias', 'Error', {
          closeButton: true,
        });
        console.error(error);
      }
    );
  }

  deleteMateria(id: any) {
    this.materiasService.deleteMateria(id).subscribe(
      (data) => {
        this.toastr.success(
          'Materia eliminada satisfactoriamente',
          'Materia Eliminada',
          {
            closeButton: true,
          }
        );

        this.getMaterias();
      },
      (error) => {
        this.toastr.error('Ocurrio un error al eliminar la materia', 'Error', {
          closeButton: true,
        });
        console.error(error);
      }
    );
  }
}
