import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsuariosApi } from '../usuarios-api';
import { UsuariosActions } from './usuarios.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  private actions$ = inject(Actions);
  private api = inject(UsuariosApi);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.load),
      switchMap(() =>
        this.api.getUsuarios().pipe(
          map((usuarios) => UsuariosActions.loadSuccess({ usuarios })),
          catchError((error) => of(UsuariosActions.loadFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.create),
      mergeMap(({ usuario }) =>
        this.api.createUsuario(usuario).pipe(
          map((created) => UsuariosActions.createSuccess({ usuario: created })),
          catchError((error) => of(UsuariosActions.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.update),
      mergeMap(({ username, usuario }) =>
        this.api.updateUsuario(username, usuario).pipe(
          map((updated) => UsuariosActions.updateSuccess({ usuario: updated })),
          catchError((error) => of(UsuariosActions.updateFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.delete),
      mergeMap(({ username }) =>
        this.api.deleteUsuario(username).pipe(
          map(() => UsuariosActions.deleteSuccess({ username })),
          catchError((error) => of(UsuariosActions.deleteFailure({ error })))
        )
      )
    )
  );
}


