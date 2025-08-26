import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CursosAPI } from '../cursos-api';
import { CursosActions } from './cursos.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CursosEffects {
  private actions$ = inject(Actions);
  private api = inject(CursosAPI);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.load),
      switchMap(() =>
        this.api.getCursos().pipe(
          map((cursos) => CursosActions.loadSuccess({ cursos })),
          catchError((error) => of(CursosActions.loadFailure({ error })))
        )
      )
    )
  );
}


