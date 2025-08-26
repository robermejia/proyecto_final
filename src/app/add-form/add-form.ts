import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css'
})
export class AddForm {
  studentForm!: FormGroup;
  @Output() studentAdded = new EventEmitter<Student>();
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    // Initialize the form here
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  onSubmit(){
    // Handle form submission logic here
    console.log('Form submitted');
    this.studentAdded.emit(this.studentForm.value);
    
  }

  onReset(){
    // Reset the form to its initial state
    this.studentForm.reset();
  }
}
