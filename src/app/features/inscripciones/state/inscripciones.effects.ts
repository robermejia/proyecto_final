import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InscripcionesAPI } from '../inscripciones-api';
import { InscripcionesActions } from './inscripciones.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class InscripcionesEffects {
  private actions$ = inject(Actions);
  private api = inject(InscripcionesAPI);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.load),
      switchMap(() =>
        this.api.getInscripciones().pipe(
          map((inscripciones) => InscripcionesActions.loadSuccess({ inscripciones })),
          catchError((error) => of(InscripcionesActions.loadFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.create),
      mergeMap(({ inscripcion }) =>
        this.api.crearInscripcion(inscripcion).pipe(
          map((created) => InscripcionesActions.createSuccess({ inscripcion: created })),
          catchError((error) => of(InscripcionesActions.createFailure({ error })))
        )
      )
    )
  );

  updateEstado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.updateEstado),
      mergeMap(({ id, estado }) =>
        this.api.actualizarEstadoInscripcion(id, estado).pipe(
          map((updated) => InscripcionesActions.updateEstadoSuccess({ inscripcion: updated })),
          catchError((error) => of(InscripcionesActions.updateEstadoFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.delete),
      mergeMap(({ id }) =>
        this.api.eliminarInscripcion(id).pipe(
          map(() => InscripcionesActions.deleteSuccess({ id })),
          catchError((error) => of(InscripcionesActions.deleteFailure({ error })))
        )
      )
    )
  );
}


