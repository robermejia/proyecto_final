import { Component, inject, OnInit } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule, JsonPipe } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";
import { switchMap } from 'rxjs';
import { Auth } from '../../core/auth/auth';
import { Store } from '@ngrx/store';
import { AlumnosActions } from './state/alumnos.actions';
import { selectAllAlumnos } from './state/alumnos.reducer';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, StudentsTable],
  templateUrl: './alumnos.html',
  styleUrls: ['./alumnos.css']
})
export class Alumnos implements OnInit {
  alumnos: Student[] = [];
  isLoading: boolean = true;
  private auth = inject(Auth);
  private store = inject(Store);

  constructor(private alumnosApi: AlumnosAPI) { }

  ngOnInit() {
    this.store.dispatch(AlumnosActions.load());
    this.store.select(selectAllAlumnos).subscribe(alumnos => this.alumnos = alumnos);
  }

  getAlumnos() {}

  deleteStudent(student: Student) {
    console.log("Eliminando alumno", student);

    this.store.dispatch(AlumnosActions.delete({ student }));
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
