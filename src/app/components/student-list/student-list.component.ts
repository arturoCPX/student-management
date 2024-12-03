import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, AddStudentComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        this.students = response.students;
      },
      error: (error) => {
        console.error('Error fetching students', error);
      }
    });
  }

  onStudentAdded(newStudent: any): void {
    this.students.push(newStudent); // Agrega el estudiante recién agregado a la lista
  }
}
