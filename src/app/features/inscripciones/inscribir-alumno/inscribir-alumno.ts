import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosAPI } from '../../alumnos/alumnos-api';
import { CursosAPI } from '../../cursos/cursos-api';
import { InscripcionesAPI } from '../inscripciones-api';
import { Student, Course, Inscripcion } from '../../../../shared/entities';

@Component({
  selector: 'app-inscribir-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscribir-alumno.html',
  styleUrls: ['./inscribir-alumno.css']
})
export class InscribirAlumno implements OnInit {
  alumnos: Student[] = [];
  cursos: Course[] = [];
  selectedStudentId: string = '';
  selectedCourseId: string = '';
  isLoading = false;
  isSubmitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private alumnosApi: AlumnosAPI,
    private cursosApi: CursosAPI,
    private inscripcionesApi: InscripcionesAPI
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.error = null;

    // Cargar alumnos y cursos en paralelo
    Promise.all([
      this.alumnosApi.getAlumnos().toPromise(),
      this.cursosApi.getCursos().toPromise()
    ]).then(([alumnos, cursos]) => {
      this.alumnos = alumnos || [];
      this.cursos = cursos || [];
      this.isLoading = false;
    }).catch(err => {
      console.error('Error al cargar datos:', err);
      this.error = 'Error al cargar alumnos y cursos';
      this.isLoading = false;
    });
  }

  inscribirAlumno(): void {
    if (!this.selectedStudentId || !this.selectedCourseId) {
      this.error = 'Por favor selecciona un alumno y un curso';
      return;
    }

    const alumno = this.alumnos.find(a => a.id === this.selectedStudentId);
    const curso = this.cursos.find(c => c.id === this.selectedCourseId);

    if (!alumno || !curso) {
      this.error = 'Alumno o curso no encontrado';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    const nuevaInscripcion: Omit<Inscripcion, 'id'> = {
      studentId: this.selectedStudentId,
      studentName: `${alumno.name} ${alumno.surname}`,
      courseId: this.selectedCourseId,
      courseName: curso.name,
      fechaInscripcion: new Date(),
      estado: 'activa'
    };

    this.inscripcionesApi.crearInscripcion(nuevaInscripcion).subscribe({
      next: (inscripcion) => {
        this.success = `Alumno ${alumno.name} ${alumno.surname} inscrito exitosamente al curso ${curso.name}`;
        this.selectedStudentId = '';
        this.selectedCourseId = '';
        this.isSubmitting = false;
        
        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.success = null;
        }, 5000);
      },
      error: (err) => {
        console.error('Error al inscribir alumno:', err);
        this.error = 'Error al inscribir al alumno al curso';
        this.isSubmitting = false;
      }
    });
  }

  limpiarMensajes(): void {
    this.error = null;
    this.success = null;
  }
}
