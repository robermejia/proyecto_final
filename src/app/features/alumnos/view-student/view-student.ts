import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe, NgIf, NgClass } from '@angular/common'; // ✅ Agrega NgClass aquí
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../../../shared/entities';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [
    NgIf,
    NgClass, // ✅ Asegúrate de incluirlo aquí
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './view-student.html',
  styleUrls: ['./view-student.css']
})
export class ViewStudent {
  student: Student | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.['student'];
  }

  goBack(): void {
    this.router.navigate(['/alumnos']); // o a donde quieras volver
  }
}
