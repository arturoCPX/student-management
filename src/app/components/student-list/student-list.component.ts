import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent: any = {
    name: '',
    email: '',
    phone: '',
    language: 'English'
  };

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

  addStudent(): void {
    if (this.isPhoneValid() && this.isEmailUnique()) {
      this.studentService.addStudent(this.newStudent).subscribe({
        next: (response) => {
          this.students.push(response.student);
          this.newStudent = { name: '', email: '', phone: '', language: 'English' }; // Reset the form
        },
        error: (error) => {
          console.error('Error adding student', error);
        }
      });
    } else {
      alert('Invalid phone number or email already exists.');
    }
  }

  isPhoneValid(): boolean {
    return /^\d{10}$/.test(this.newStudent.phone);
  }

  isEmailUnique(): boolean {
    return !this.students.some(student => student.email === this.newStudent.email);
  }
}
