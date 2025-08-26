import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { Auth } from '../core/auth/auth';
import { User } from '../core/auth/auth';
import { Store } from '@ngrx/store';
import { AppActions } from '../state/app.actions';
import { selectTitle, selectUser } from '../state/app.selectors';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [Bigtitle, CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  private auth = inject(Auth);
  private router = inject(Router);
  private store = inject(Store);
  
  currentTitle = 'AppCoderHouse';
  currentUser: User | null = null;

  constructor() {
    this.store.select(selectUser).subscribe(user => this.currentUser = user);
    this.store.select(selectTitle).subscribe(title => this.currentTitle = title);

    // Obtener el título según la ruta actual
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.url);
    });
  }

  private updateTitle(url: string): void {
    const title = url.includes('/alumnos') ? 'Gestión de Alumnos'
      : url.includes('/cursos') ? 'Gestión de Cursos'
      : url.includes('/inscripciones') ? 'Gestión de Inscripciones'
      : url.includes('/usuarios') ? 'Gestión de Usuarios'
      : 'AppCoderHouse';
    this.store.dispatch(AppActions.setTitle({ title }));
  }
}
