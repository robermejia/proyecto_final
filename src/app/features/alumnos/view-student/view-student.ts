import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe, NgIf, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, switchMap, of } from 'rxjs';
import { Student } from '../../../../shared/entities';
import { selectAlumnoEntities } from '../state/alumnos.reducer';
import { AlumnosActions } from '../state/alumnos.actions';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './view-student.html',
  styleUrls: ['./view-student.css']
})
export class ViewStudent implements OnInit, OnDestroy {
  student: Student | undefined;
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ViewStudent ngOnInit - Iniciando...');
    
    // Primero intentar obtener el estudiante del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const studentFromState = navigation?.extras.state?.['student'];
    
    console.log('Navigation state:', navigation?.extras.state);
    console.log('Student from state:', studentFromState);
    
    if (studentFromState) {
      console.log('Usando estudiante del estado de navegación:', studentFromState);
      this.student = studentFromState;
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

  goBack(): void {
    this.router.navigate(['/alumnos']);
  }
}
