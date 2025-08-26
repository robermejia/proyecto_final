import { Routes } from '@angular/router';
import { Alumnos } from './features/alumnos/alumnos';
import { Navegacion } from '../shared/enums/enums';
import { ViewStudent } from './features/alumnos/view-student/view-student';
import { Login } from './login/login';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "",
        redirectTo: "/alumnos",
        pathMatch: "full"
    },
    {
        path: Navegacion.Alumnos,
        component: Alumnos,
        canActivate: [AuthGuard]
    },
    {
        path: Navegacion.ViewStudent,
        component: ViewStudent,
        canActivate: [AuthGuard]
    },
    {
        path: Navegacion.EditStudent,
        loadComponent: () => import('./features/alumnos/edit-student/edit-student').then(m => m.EditStudent),
        canActivate: [AuthGuard]
    },
    {
        path: Navegacion.Cursos,
        loadComponent: () => import('./features/cursos/cursos').then(m => m.Cursos),
        canActivate: [AuthGuard]
    },
    {
        path: Navegacion.Inscripciones,
        loadComponent: () => import('./features/inscripciones/inscripciones').then(m => m.Inscripciones),
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios",
        loadComponent: () => import('./features/usuarios/usuarios').then(m => m.Usuarios),
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: "**",
        redirectTo: "/alumnos"
    }
];

