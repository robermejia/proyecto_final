import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navegacion } from '../../shared/enums/enums';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Auth } from '../core/auth/auth';
import { User } from '../core/auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, MatSnackBarModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  public Navegacion = Navegacion;
  private auth = inject(Auth);
  
  get currentUser(): User | null {
    return this.auth.getCurrentUser();
  }
  
  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  
  get isUser(): boolean {
    return this.auth.isUser();
  }
  
  logout(): void {
    this.auth.logout();
  }
}