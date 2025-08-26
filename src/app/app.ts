import { ChangeDetectorRef, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet, Router } from '@angular/router';
import { Navegacion } from '../shared/enums/enums';
import { Student } from '../shared/entities';
import { Footer } from './footer/footer';
import { Auth } from './core/auth/auth';
import { Store } from '@ngrx/store';
import { AppActions } from './state/app.actions';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Toolbar, Navbar, Footer, MatSnackBarModule, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Title of the application
  protected readonly title = signal('tercer_avance');

  rutas = Navegacion
  @Output() sectionChanged = new EventEmitter<string>();

  students: Student[] = [];
  activeSection = "students";
  private _snackBar = inject(MatSnackBar);
  auth = inject(Auth);
  private router = inject(Router);

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private store: Store) { }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = this.auth.getCurrentUser();
    this.store.dispatch(AppActions.setUser({ user }));

    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;
      this.cdr.detectChanges();
    });
  }

  navigate(section: string) {
    this.activeSection = section;
    this.sectionChanged.emit(section);
  }

  addStudent(student: Student) {
    console.log('Adding student:', student);
    this.students = [...this.students, student];

    this._snackBar.open('Estudiante añadido correctamente', 'Cerrar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'] // clase opcional para estilos
    });
  }


  deleteStudent(dni: string) {
    const studentsList = this.students.filter(student => student.dni.toString() !== dni);
    if (studentsList.length < this.students.length) {
      this.students = [...studentsList];
      this._snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
        duration: 3000, // 3 segundos
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'] // clase opcional para estilos
      });
    } else {
      this._snackBar.open('No se encontró el estudiante a eliminar', 'Cerrar', {
        duration: 3000
      });
    }
  }

  /*
  editStudent(data: { dni: string; updatedStudent: any }) {
    const index = this.students.findIndex(s => s.dni.toString() === data.dni);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...data.updatedStudent };
      this.students = [...this.students]; // Trigger change detection
    }
  }*/

  editStudent(data: { dni: string; updatedStudent: any }) {
    const index = this.students.findIndex(s => s.dni.toString() === data.dni);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...data.updatedStudent };
      this.students = [...this.students]; // Trigger change detection

      // Notificación de éxito (esquina superior derecha)
      this._snackBar.open('Estudiante actualizado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    } else {
      // Notificación de error si no se encuentra
      this._snackBar.open('No se encontró el estudiante para actualizar', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }

  
}
