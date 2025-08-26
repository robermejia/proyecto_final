import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlumnosAPI } from '../alumnos-api';
import { AlumnosActions } from './alumnos.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class AlumnosEffects {
  private actions$ = inject(Actions);
  private api = inject(AlumnosAPI);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.load),
      switchMap(() =>
        this.api.getAlumnos().pipe(
          map((alumnos) => AlumnosActions.loadSuccess({ alumnos })),
          catchError((error) => of(AlumnosActions.loadFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.delete),
      mergeMap(({ student }) =>
        this.api.deleteAlumno(student).pipe(
          map(() => AlumnosActions.deleteSuccess({ student })),
          catchError((error) => of(AlumnosActions.deleteFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.update),
      mergeMap(({ student }) =>
        this.api.updateAlumno(student).pipe(
          map((updated) => AlumnosActions.updateSuccess({ student: updated })),
          catchError((error) => of(AlumnosActions.updateFailure({ error })))
        )
      )
    )
  );
}


