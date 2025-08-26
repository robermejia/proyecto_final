import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './state/app.reducer';
import { AlumnosEffects } from './features/alumnos/state/alumnos.effects';
import { alumnosReducer } from './features/alumnos/state/alumnos.reducer';
import { cursosReducer } from './features/cursos/state/cursos.reducer';
import { CursosEffects } from './features/cursos/state/cursos.effects';
import { inscripcionesReducer } from './features/inscripciones/state/inscripciones.reducer';
import { InscripcionesEffects } from './features/inscripciones/state/inscripciones.effects';
import { usuariosReducer } from './features/usuarios/state/usuarios.reducer';
import { UsuariosEffects } from './features/usuarios/state/usuarios.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // ✅ cambio realizado aquí
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({
      app: appReducer,
      alumnos: alumnosReducer,
      cursos: cursosReducer,
      inscripciones: inscripcionesReducer,
      usuarios: usuariosReducer,
    }),
    provideEffects([AlumnosEffects, CursosEffects, InscripcionesEffects, UsuariosEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
