import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../shared/entities';

import { MatTableModule } from '@angular/material/table';
import { FullnamePipe } from '../../shared/pipes/fullname-pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [MatTableModule, FullnamePipe, RouterModule, CommonModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.css'
})
export class StudentsTable {
  @Input() students: Student[] = [];
  @Input() isAdmin: boolean = false;

  @Output() deleteEvent = new EventEmitter<Student>();

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', "actions"];

  constructor(private router: Router) { }


  viewDetails(student: Student) {
    console.log("Viendo detalles del estudiante:", student);
    // Usar query params como fallback
    this.router.navigate(['/view-student'], {
      state: { student: student },
      queryParams: { id: student.id || student.dni.toString() }
    });
  }

  deleteStudent(student: Student) {
    console.log("Eliminando alumno", student);
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar a ${student.name} ${student.surname}?`);
    if (confirmed) {
      this.deleteEvent.emit(student);
    }
  }

  editStudent(student: Student) {
    console.log("Editando estudiante:", student);
    // Usar query params como fallback
    this.router.navigate(['/edit-student'], {
      state: { student },
      queryParams: { id: student.id || student.dni.toString() }
    });
  }


}