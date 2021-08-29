import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMateria } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-detalles-materias',
  templateUrl: './detalles-materias.component.html',
  styleUrls: ['./detalles-materias.component.css'],
})
export class DetallesMateriasComponent implements OnInit {
  id: number;
  materia: IMateria | undefined;
  constructor(
    private aRoute: ActivatedRoute,
    private materiasService: MateriasService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getMateria();
  }

  getMateria() {
    this.materiasService.getMateria(this.id).subscribe((data: IMateria) => {
      this.materia = data;
    });
  }
}
