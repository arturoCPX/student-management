import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';//Para utilizar ngFor
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, AddStudentComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  //Lista para almacenas los estudiantes
  students: any[] = [];

  //Comunicacion con el servidor para las solicitudes
  constructor(private studentService: StudentService) {}

  //Se ejecuta un vez y llama al metodo
  ngOnInit(): void {
    this.fetchStudents();
  }

  //Metodo para listar
  fetchStudents(): void {
    this.studentService.getStudents().subscribe({//Llamamos al metodo get del servicio
      next: (response) => {//Se recorre si es correcta la API
        this.students = response.students;
      },
      error: (error) => {
        console.error('Error fetching students', error);
      }
    });
  }


}
