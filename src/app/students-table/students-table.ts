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
    this.router.navigate(['/view-student'], {
      state: { student: student }
    });
  }

  deleteStudent(student: Student) {
    console.log("Eliminando alumno", student);
    this.deleteEvent.emit(student);
  }

  editStudent(student: Student) {
    this.router.navigate(['/edit-student'], {
      state: { student }
    });
  }


}