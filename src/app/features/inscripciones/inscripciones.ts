import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Inscripcion } from '../../../shared/entities';
import { InscribirAlumno } from './inscribir-alumno/inscribir-alumno';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, InscribirAlumno],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {
  // MockAPI base URL for inscripciones
  private baseUrl = 'https://68a42ed2c123272fb9b1aaeb.mockapi.io/api/v1';
  inscripciones: Inscripcion[] = [];
  isLoading = true;
  error: string | null = null;
  mostrarFormulario = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.isLoading = true;
    this.error = null;
    
    this.http.get<Inscripcion[]>(`${this.baseUrl}/inscripciones`).subscribe({
      next: (resp) => {
        this.inscripciones = resp.map(inscripcion => ({
          ...inscripcion,
          fechaInscripcion: new Date(inscripcion.fechaInscripcion)
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar inscripciones:', err);
        this.error = 'Error al cargar las inscripciones';
        this.isLoading = false;
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'activa':
        return 'estado-activa';
      case 'cancelada':
        return 'estado-cancelada';
      case 'completada':
        return 'estado-completada';
      default:
        return '';
    }
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onInscripcionCreada(): void {
    this.cargarInscripciones();
    this.mostrarFormulario = false;
  }
}
