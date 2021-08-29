import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgregarEditarAlumnoComponent } from './components/alumnos/agregar-editar-alumno/agregar-editar-alumno.component';
import { DetallesAlumnoComponent } from './components/alumnos/detalles-alumno/detalles-alumno.component';
import { ListarAlumnosComponent } from './components/alumnos/listar-alumnos/listar-alumnos.component';
import { AgregarEditarMateriaComponent } from './components/materias/agregar-editar-materia/agregar-editar-materia.component';
import { ListarMateriasComponent } from './components/materias/listar-materias/listar-materias.component';
import { DetallesMateriasComponent } from './components/materias/detalles-materias/detalles-materias.component';
import { AgregarEditarInscripcionComponent } from './components/inscripciones/agregar-editar-inscripcion/agregar-editar-inscripcion.component';
import { DetallesInscripcionComponent } from './components/inscripciones/detalles-inscripcion/detalles-inscripcion.component';
import { ListarInscripcionesComponent } from './components/inscripciones/listar-inscripciones/listar-inscripciones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AgregarEditarAlumnoComponent,
    DetallesAlumnoComponent,
    ListarAlumnosComponent,
    AgregarEditarMateriaComponent,
    ListarMateriasComponent,
    DetallesMateriasComponent,
    AgregarEditarInscripcionComponent,
    DetallesInscripcionComponent,
    ListarInscripcionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
