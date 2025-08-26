import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../../shared/entities';
import { delay, Observable } from 'rxjs';
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
    return this.http.get<Student[]>(`${this.baseUrl}/${DbRoutes.Students}`);
  }


  deleteAlumno(student: Student): Observable<void> {
    const resourceId = (student as any).id ?? student.dni;
    return this.http.delete<void>(`${this.baseUrl}/${DbRoutes.Students}/${resourceId}`);
  }

  updateAlumno(student: Student): Observable<Student> {
    const resourceId = (student as any).id ?? student.dni;
    return this.http.put<Student>(`${this.baseUrl}/${DbRoutes.Students}/${resourceId}`, student);
  }



}
