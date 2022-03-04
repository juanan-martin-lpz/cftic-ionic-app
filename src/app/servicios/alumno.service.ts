import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlumno } from '../models/ialumno';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly REMOTE_SERVER = 'http://10.1.2.10:3000';
  private readonly LOCAL_SERVER = 'http://localhost:3000';

  private CURRENT_SERVER = '';

  private headers: HttpHeaders = new HttpHeaders({"Content-type": "application/x-www-form-urlencoded"});


  constructor(private http: HttpClient) {
    this.CURRENT_SERVER = this.REMOTE_SERVER;

    //this.headers = new HttpHeaders({"Content-type": "application/json"});
    //this.headers.set("Content-type", "application/json");
  }

  obtenerAlumnos(): Observable<IAlumno[]> {

    return this.http.get<IAlumno[]>(`${this.CURRENT_SERVER}/alumno`);

  }

  obtenerAlumnoPorId(id: number): Observable<IAlumno> {

    return this.http.get<IAlumno>(`${this.CURRENT_SERVER}/alumno/` + id.toString());

  }

  modificarAlumno(alumno: IAlumno): Observable<IAlumno> {

    console.log(this.headers);

    return this.http.put<IAlumno>(`${this.CURRENT_SERVER}/alumno/${alumno.id}`, alumno, { headers: this.headers });

  }

  nuevoAlumno(alumno: IAlumno): Observable<IAlumno> {

    return this.http.post<IAlumno>(`${this.CURRENT_SERVER}/alumno`, alumno, { headers: this.headers });

  }

  borrarAlumno(id: number): Observable<void> {

    return this.http.delete<void>(`${this.CURRENT_SERVER}/alumno/` + id.toString());

  }

}
