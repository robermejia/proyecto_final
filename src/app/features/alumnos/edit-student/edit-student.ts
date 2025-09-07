import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, switchMap, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../../../shared/entities';
import { AlumnosAPI } from '../alumnos-api';
import { AlumnosActions } from '../state/alumnos.actions';
import { selectAlumnoEntities } from '../state/alumnos.reducer';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudent implements OnInit, OnDestroy {
  studentForm!: FormGroup;
  student: Student | undefined;
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alumnosApi: AlumnosAPI
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: [{ value: '', disabled: true }],
      age: ['', Validators.required],
      average: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnInit() {
    console.log('EditStudent ngOnInit - Iniciando...');
    
    // Primero intentar obtener el estudiante del estado de navegación
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { student: Student };
    
    console.log('Navigation state:', nav?.extras.state);
    console.log('Student from state:', state?.student);
    
    if (state?.student) {
      console.log('Usando estudiante del estado de navegación:', state.student);
      this.student = state.student;
      this.initializeForm();
    } else {
      console.log('No hay estado de navegación, buscando en el store...');
      // Buscar por query params o usar el primer estudiante disponible
      const queryParams = this.route.snapshot.queryParams;
      const studentId = queryParams['id'];
      console.log('Query params:', queryParams);
      console.log('Student ID from query:', studentId);
      
      this.store.select(selectAlumnoEntities)
        .pipe(takeUntil(this.destroy$))
        .subscribe(entities => {
          console.log('Entidades del store:', entities);
          if (entities && Object.keys(entities).length > 0) {
            if (studentId) {
              // Buscar por ID específico
              this.student = Object.values(entities).find(s => 
                s && (s.id === studentId || s.dni.toString() === studentId)
              );
              console.log('Estudiante encontrado por ID:', this.student);
            }
            
            // Si no se encontró por ID, usar el primero disponible
            if (!this.student) {
              this.student = Object.values(entities)[0];
              console.log('Usando primer estudiante del store:', this.student);
            }
            
            if (this.student) {
              this.initializeForm();
            }
          } else {
            console.log('No hay entidades en el store');
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm() {
    if (this.student) {
      this.studentForm.patchValue({
        name: this.student.name,
        surname: this.student.surname,
        dni: this.student.dni,
        age: this.student.age,
        average: this.student.average,
      });
    }
  }

  submitForm() {
    if (this.studentForm.valid && this.student) {
      const updatedStudent: Student = {
        ...this.student,
        ...this.studentForm.getRawValue(), // dni está deshabilitado, por eso usamos getRawValue()
      };

      // Usar NgRx para actualizar el estado
      this.store.dispatch(AlumnosActions.update({ student: updatedStudent }));
      this.router.navigate(['/alumnos']);
    }
  }

  cancel() {
    this.router.navigate(['/alumnos']);
  }
}
