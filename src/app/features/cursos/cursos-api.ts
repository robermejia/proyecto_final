import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../../shared/entities';
import { Observable } from 'rxjs';
import { DbRoutes } from '../../../shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class CursosAPI {
  // MockAPI base URL for courses
  baseUrl = "https://689296dfc49d24bce867de63.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${DbRoutes.Courses}`);
  }
}
