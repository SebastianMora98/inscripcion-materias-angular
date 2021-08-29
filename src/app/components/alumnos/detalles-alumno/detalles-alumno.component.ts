import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.css'],
})
export class DetallesAlumnoComponent implements OnInit {
  id: number;
  alumno: any;
  constructor(
    private aRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno() {
    this.alumnosService.getAlumno(this.id).subscribe((data: IAlumno) => {
      this.alumno = data;
    });
  }
}
