import { Component, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  newStudent = {
    name: '',
    email: '',
    phone: '',
    language: 'English'
  };

  @Output() studentAdded = new EventEmitter<any>();  // Emite el evento cuando se agrega un estudiante

  constructor(private studentService: StudentService) {}

  addStudent(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.studentService.addStudent(this.newStudent).subscribe({
      next: (response) => {
        this.studentAdded.emit(response.student);
        alert('Student added correctly');
        form.reset(); 
        location.reload();
      },
      error: (error) => {
        console.error('Error adding student', error);
        alert('Error adding student');
      }
    });
  }

}
