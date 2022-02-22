import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../../models/ialumno';
import { AlumnoService } from '../../servicios/alumno.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
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

  constructor(private alumnoService: AlumnoService, private router: Router, public alertController: AlertController) {

    this.lista_alumnos = [];

    let promesa = this.alumnoService.obtenerAlumnos().toPromise();//.subscribe(lista => this.lista_alumnos = lista);

    promesa
      .then(lista => this.lista_alumnos = lista)
      .catch(e => this.showError(e));

    this.automatico = false;
    this.actualizando = false;

  }

  ngOnInit(): void {
  }

  async showError(error: HttpErrorResponse) {

    console.log(error);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: error.message,
      buttons: ['OK']
    });

    await alert.present();
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
