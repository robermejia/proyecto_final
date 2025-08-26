import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosAPI } from './cursos-api';
import { Course, Student } from '../../../shared/entities'; // o desde donde lo crees
import { StudentsTable } from '../../students-table/students-table';
import { Store } from '@ngrx/store';
import { selectAllCursos } from './state/cursos.reducer';
import { CursosActions } from './state/cursos.actions';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos implements OnInit {
  deleteStudent($event: Student) {
    throw new Error('Method not implemented.');
  }
  cursos: Course[] = [];
  isLoading = true;
  alumnos: Student[] = [];


  constructor(private cursosApi: CursosAPI, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.load());
    this.store.select(selectAllCursos).subscribe((cursos: Course[]) => {
      this.cursos = cursos;
      this.isLoading = false;
    });
  }
}
