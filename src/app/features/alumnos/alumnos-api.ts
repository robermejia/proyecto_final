import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../../shared/entities';
import { delay, Observable, of, catchError } from 'rxjs';
import { DbRoutes } from '../../../shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  // Using MockAPI for students
  baseUrl = "https://689296dfc49d24bce867de63.mockapi.io/api/v1";
  constructor(
    private http: HttpClient
  ) { }
  getAlumnos(): Observable<Student[]> {
    //PREFERIR ENUM, hardcodear students o courses
    return this.http.get<Student[]>(`${this.baseUrl}/${DbRoutes.Students}`).pipe(
      delay(2000), // 2 segundos de delay para mostrar loading
      catchError(error => {
        console.warn('Error al cargar desde API externa, usando datos locales:', error);
        // Fallback con datos locales - también con delay de 2 segundos
        return of(this.getLocalStudents()).pipe(delay(2000));
      })
    );
  }

  private getLocalStudents(): Student[] {
    return [
      { id: '1', name: 'Juan', surname: 'Pérez', age: 20, dni: 12345678, average: 8.5 },
      { id: '2', name: 'María', surname: 'González', age: 22, dni: 87654321, average: 9.2 },
      { id: '3', name: 'Carlos', surname: 'López', age: 19, dni: 11223344, average: 7.8 },
      { id: '4', name: 'Ana', surname: 'Martínez', age: 21, dni: 44332211, average: 8.9 },
      { id: '5', name: 'Luis', surname: 'Rodríguez', age: 23, dni: 55667788, average: 9.5 }
    ];
  }


  deleteAlumno(student: Student): Observable<void> {
    const resourceId = student.id ?? student.dni.toString();
    return this.http.delete<void>(`${this.baseUrl}/${DbRoutes.Students}/${resourceId}`);
  }

  updateAlumno(student: Student): Observable<Student> {
    const resourceId = student.id ?? student.dni.toString();
    return this.http.put<Student>(`${this.baseUrl}/${DbRoutes.Students}/${resourceId}`, student);
  }



}
