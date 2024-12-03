import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Indica que el sevicio es global
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //Url para las soicitudes
  private apiUrl = 'http://127.0.0.1:8000/api';

  //HttpClietn Ayuda al servicio a usar get, post, put, delete, etc
  constructor(private http: HttpClient) {}

  //Metodo para obtener Estudiantes(Devuelve un Observable que contiene la respuesta de la api)
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  //Metodo para agregar, en student llega el nuevo
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }
  
}
