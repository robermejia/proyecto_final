import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css'
})
export class EditForm implements OnInit {
  private _snackBar = inject(MatSnackBar);
  @Output() studentEdited = new EventEmitter<{ dni: string; updatedStudent: any }>();

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      average: ['', Validators.required]
    });
  }

  onEdit() {
  if (this.studentForm.valid) {
    const { dni, ...updatedStudent } = this.studentForm.value;
    this.studentEdited.emit({ dni, updatedStudent });

    // ❌ Elimina esta línea
    // this._snackBar.open('Estudiante editado con éxito', 'Cerrar', { duration: 3000 });
  }
}

}
