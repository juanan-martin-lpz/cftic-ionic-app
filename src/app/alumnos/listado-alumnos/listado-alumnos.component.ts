import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../../models/ialumno';
import { AlumnoService } from '../../servicios/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit {

  public lista_alumnos: IAlumno[];

  public automatico: boolean;
  public actualizando: boolean;


  private interval: any;

  constructor(private alumnoService: AlumnoService, private router: Router) {

    this.lista_alumnos = [];

    this.alumnoService.obtenerAlumnos().subscribe(lista => this.lista_alumnos = lista);

    this.automatico = false;
    this.actualizando = false;

  }

  ngOnInit(): void {
  }


  borrar(id: number): void {
    this.alumnoService.borrarAlumno(id).subscribe();

    this.router.navigateByUrl('/alumnos');

  }

  getAlumno() {

    this.alumnoService.obtenerAlumnos().subscribe(lista => {
      this.lista_alumnos = lista;
      this.actualizando = false;
    });
  }

  autoclick() {

    this.automatico = !this.automatico;

    if (this.automatico) {

      this.interval = setInterval(() => {
        this.actualizando = true;
        this.alumnoService.obtenerAlumnos().subscribe(lista => {
          this.lista_alumnos = lista;
          this.actualizando = false;
        });
      }, 3000);

      // version alternativa con funcion regular
      //this.interval = setInterval(this.getAlumno.bind(this), 3000);

    }
    else {
      clearInterval(this.interval);
    }
  }

}
