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
        this.studentAdded.emit(response.student);  // Emite el estudiante recién agregado
        alert('Estudiante agregado exitosamente');
        form.reset();  // Resetea el formulario
        location.reload();
      },
      error: (error) => {
        console.error('Error al agregar estudiante', error);
        alert('Error al agregar estudiante');
      }
    });
  }

}
