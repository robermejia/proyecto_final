import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../../../shared/entities';
import { AlumnosAPI } from '../alumnos-api';


@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudent {
  studentForm!: FormGroup;
  student!: Student;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alumnosApi: AlumnosAPI
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { student: Student };
    this.student = state?.student;

    this.studentForm = this.fb.group({
      name: [this.student?.name || '', Validators.required],
      surname: [this.student?.surname || '', Validators.required],
      dni: [{ value: this.student?.dni || '', disabled: true }], // ❗ importante: dni deshabilitado
      age: [this.student?.age || '', Validators.required],
      average: [this.student?.average || '', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  submitForm() {
    if (this.studentForm.valid) {
      const updatedStudent: Student = {
        ...this.student,
        ...this.studentForm.getRawValue(), // dni está deshabilitado, por eso usamos getRawValue()
      };

      this.alumnosApi.updateAlumno(updatedStudent).subscribe(() => {
        this.router.navigate(['/alumnos']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/alumnos']);
  }
}
