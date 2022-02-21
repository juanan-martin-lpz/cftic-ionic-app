import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dni-ionic',
  templateUrl: './dni-ionic.component.html',
  styleUrls: ['./dni-ionic.component.scss'],
})
export class DniIonicComponent implements OnInit {

  public dni: string;
  public dniok: boolean;

  // Arrays varios
  private readonly letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  private readonly letrasExt = 'XYZ';

  constructor(public alertController: AlertController, public toastController: ToastController) {
    this.dni = '';
    this.dniok = false;
  }



  // Obtiene el numero sin letra. Mas bien todo menos el ultimo digito
  numero(dni: string): number {
    return parseInt(dni.substring(0, dni.length - 1), 10);
  }

  // Obtiene la letra del dni pasado. El ultimo digito mas bien
  private letra(dni: string): string {
    return dni[dni.length - 1];
  }

  // Validamos si el dni pertenece a extranjero
  private validExtFormat(dni: string): boolean {
    return dni.startsWith('X') || dni.startsWith('Y') || dni.startsWith('Z');
  }

  // Sustituimos la letra de extranjero por su valor
  private substituteExt(dni: string): string {
    return `${this.letrasExt.search(dni[0])}${dni.substring(1)}`;
  }

  // Validamos si el dni pertenece a nacional
  private validNacFormat(dni: string): boolean {
    return this.letras.includes(this.letra(dni).toUpperCase());
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public comprobarDni(): void {
    // Comprobar nacional o extranjero
    // Extranjero
    const finaldni = this.validExtFormat(this.dni)
      ? this.substituteExt(this.dni)
      : this.dni;

    // Nacional
    if (this.validNacFormat(finaldni)) {
      if (this.validDni(finaldni)) {
        // Mostramos el mensaje
        //console.log("DNI ok");
        this.dniok = true;
        this.showMessage('DNI ok');
      } else {
        // Mostramos error
        //console.log("Dni error");
        this.dniok = false;
        this.showError('DNI incorrecto');
      }
    } else {
      //console.log("Error de formato");
      this.dniok = false;
      this.showError('Error en el formato del DNI');
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async showMessage(msg: string): Promise<void> {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Letra D.N.I.',
      subHeader: 'Resultado',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async showError(msg: string): Promise<void> {

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // Validamos la validez del dni pasado
  // eslint-disable-next-line @typescript-eslint/member-ordering
  validDni(dni: string): boolean {
    const indice = this.numero(dni) % 23;
    return this.letras[indice] == this.letra(dni) ? true : false;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  clearUI() {

    console.log("Clearing");

    this.dni = '';
    this.dniok = false;
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnInit(): void {}

}
