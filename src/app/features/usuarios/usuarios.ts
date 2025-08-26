import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosApi } from './usuarios-api';
import { User } from '../../core/auth/auth';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios implements OnInit {
  usuarios: User[] = [];
  displayedColumns: string[] = ['username', 'role', 'actions'];

  constructor(
    private usuariosApi: UsuariosApi,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuariosApi.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  editUsuario(usuario: User): void {
    // Implementar edición de usuario
    this.snackBar.open('Funcionalidad de edición en desarrollo', 'Cerrar', {
      duration: 3000
    });
  }

  deleteUsuario(usuario: User): void {
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${usuario.username}?`)) {
      this.usuariosApi.deleteUsuario(usuario.username).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.loadUsuarios();
        },
        error: (error) => {
          console.error('Error eliminando usuario:', error);
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  viewUsuario(usuario: User): void {
    // Implementar vista detallada de usuario
    this.snackBar.open('Funcionalidad de vista en desarrollo', 'Cerrar', {
      duration: 3000
    });
  }
}
