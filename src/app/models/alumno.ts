import { IAlumno } from './ialumno';

export class Alumno implements IAlumno {
  id!: number;
  nombre!: string;
  apellido!: string;
  email!: string;
  edad!: number;
  creadoEn!: Date;
  fotoHashCode!: any;
  links!: string[];

  constructor(alumno?: IAlumno) {
    if (alumno) {
      this.id = alumno.id;
      this.nombre = alumno.nombre;
      this.apellido = alumno.apellido;
      this.email = alumno.email;
      this.edad = alumno.edad;
      this.creadoEn = new Date(alumno.creadoEn);
      this.fotoHashCode = alumno.fotoHashCode;

      this.links = alumno.links;

    }
    else {
      this.nombre = "";
      this.apellido = "";
      this.email = "";
      this.edad = 0;
      this.creadoEn = new Date();
      this.fotoHashCode = 0;

      this.links = [];
    }
  }
}
