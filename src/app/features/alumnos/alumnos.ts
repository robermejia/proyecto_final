import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule, JsonPipe } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";
import { switchMap, Subject, takeUntil } from 'rxjs';
import { Auth } from '../../core/auth/auth';
import { Store } from '@ngrx/store';
import { AlumnosActions } from './state/alumnos.actions';
import { selectAllAlumnos, selectAlumnosIsLoading } from './state/alumnos.reducer';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, StudentsTable],
  templateUrl: './alumnos.html',
  styleUrls: ['./alumnos.css']
})
export class Alumnos implements OnInit, OnDestroy {
  alumnos: Student[] = [];
  isLoading: boolean = true;
  private auth = inject(Auth);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  constructor(private alumnosApi: AlumnosAPI) { }

  ngOnInit() {
    this.store.dispatch(AlumnosActions.load());
    
    this.store.select(selectAllAlumnos)
      .pipe(takeUntil(this.destroy$))
      .subscribe(alumnos => this.alumnos = alumnos);
    
    this.store.select(selectAlumnosIsLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refreshAlumnos() {
    this.store.dispatch(AlumnosActions.load());
  }

  deleteStudent(student: Student) {
    console.log("Eliminando alumno", student);
    this.store.dispatch(AlumnosActions.delete({ student }));
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
