import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarEditarAlumnoComponent } from './components/alumnos/agregar-editar-alumno/agregar-editar-alumno.component';
import { DetallesAlumnoComponent } from './components/alumnos/detalles-alumno/detalles-alumno.component';
import { ListarAlumnosComponent } from './components/alumnos/listar-alumnos/listar-alumnos.component';
import { AgregarEditarInscripcionComponent } from './components/inscripciones/agregar-editar-inscripcion/agregar-editar-inscripcion.component';
import { DetallesInscripcionComponent } from './components/inscripciones/detalles-inscripcion/detalles-inscripcion.component';
import { ListarInscripcionesComponent } from './components/inscripciones/listar-inscripciones/listar-inscripciones.component';
import { AgregarEditarMateriaComponent } from './components/materias/agregar-editar-materia/agregar-editar-materia.component';
import { DetallesMateriasComponent } from './components/materias/detalles-materias/detalles-materias.component';
import { ListarMateriasComponent } from './components/materias/listar-materias/listar-materias.component';

const routes: Routes = [
  {
    path: 'listar-alumnos',
    component: ListarAlumnosComponent,
  },
  {
    path: 'agregar-alumno',
    component: AgregarEditarAlumnoComponent,
  },
  {
    path: 'editar-alumno/:id',
    component: AgregarEditarAlumnoComponent,
  },
  {
    path: 'detalles-alumno/:id',
    component: DetallesAlumnoComponent,
  },
  {
    path: 'listar-materias',
    component: ListarMateriasComponent,
  },
  {
    path: 'agregar-materias',
    component: AgregarEditarMateriaComponent,
  },
  {
    path: 'editar-materia/:id',
    component: AgregarEditarMateriaComponent,
  },
  {
    path: 'detalles-materia/:id',
    component: DetallesMateriasComponent,
  },
  {
    path: 'listar-inscripciones',
    component: ListarInscripcionesComponent,
  },
  {
    path: 'agregar-inscripcion',
    component: AgregarEditarInscripcionComponent,
  },
  {
    path: 'editar-inscripcion/alumno/:idAlumno/materia/:idMateria',
    component: AgregarEditarInscripcionComponent,
  },
  {
    path: 'detalles-inscripcion/alumno/:idAlumno/materia/:idMateria',
    component: DetallesInscripcionComponent,
  },
  { path: '**', redirectTo: 'listar-inscripciones', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
