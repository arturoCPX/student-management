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
  //Objeto para el nuevo estudiante
  newStudent = {
    name: '',
    email: '',
    phone: '',
    language: 'English'
  };

  //Decorador Output
  @Output() studentAdded = new EventEmitter<any>(); 

  //Permite usar los metodos del servicio
  constructor(private studentService: StudentService) {}

  //
  addStudent(form: NgForm) {
    //Validar si los campos estan invalidos
    if (form.invalid) {
      return;
    }

    //Si esta conrectos, se llama al servicio y al metodo agregar, mandandole el objeto
    this.studentService.addStudent(this.newStudent).subscribe({
      next: (response) => {//Se ejecuta si la api reponde bien
        this.studentAdded.emit(response.student);//Emite el vento studentAdded con los datos del estudiante
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
