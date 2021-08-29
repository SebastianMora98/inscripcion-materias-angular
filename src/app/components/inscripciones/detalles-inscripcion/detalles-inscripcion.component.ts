import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInscripcion } from 'src/app/interfaces/inscripcion';
import { IMateria } from 'src/app/interfaces/materia';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-detalles-inscripcion',
  templateUrl: './detalles-inscripcion.component.html',
  styleUrls: ['./detalles-inscripcion.component.css'],
})
export class DetallesInscripcionComponent implements OnInit {
  idAlumno: number;
  idMateria: number;

  inscripcion: any;
  constructor(
    private aRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {
    this.idAlumno = +this.aRoute.snapshot.paramMap.get('idAlumno')!;
    this.idMateria = +this.aRoute.snapshot.paramMap.get('idMateria')!;
  }

  ngOnInit(): void {
    this.getInscripcion();
  }

  getInscripcion() {
    this.inscripcionesService
      .getInscripcion(this.idAlumno, this.idMateria)
      .subscribe((data: IInscripcion) => {
        this.inscripcion = data;
        console.log(data);
      });
  }
}
