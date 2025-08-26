import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesAPI {
  private baseUrl = 'https://68a42ed2c123272fb9b1aaeb.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  // Obtener todas las inscripciones
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}/inscripciones`);
  }

  // Crear una nueva inscripción
  crearInscripcion(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.baseUrl}/inscripciones`, inscripcion);
  }

  // Actualizar el estado de una inscripción
  actualizarEstadoInscripcion(id: string, estado: 'activa' | 'cancelada' | 'completada'): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.baseUrl}/inscripciones/${id}`, { estado });
  }

  // Obtener inscripciones por alumno
  getInscripcionesPorAlumno(studentId: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}/inscripciones?studentId=${studentId}`);
  }

  // Obtener inscripciones por curso
  getInscripcionesPorCurso(courseId: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}/inscripciones?courseId=${courseId}`);
  }

  // Eliminar una inscripción
  eliminarInscripcion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/inscripciones/${id}`);
  }
}
