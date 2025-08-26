import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApi {
  private apiUrl = 'https://mockapi.io/projects/your-project-id/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<User[]> {
    // Mock data por ahora
    return new Observable(observer => {
      const mockUsuarios: User[] = [
        { username: 'admin', role: 'admin' },
        { username: 'user', role: 'user' },
        { username: 'profesor1', role: 'user' },
        { username: 'estudiante1', role: 'user' }
      ];
      observer.next(mockUsuarios);
      observer.complete();
    });
  }

  createUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, usuario);
  }

  updateUsuario(username: string, usuario: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${username}`, usuario);
  }

  deleteUsuario(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${username}`);
  }

  getUsuario(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }
}
