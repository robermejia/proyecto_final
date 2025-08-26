import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../core/auth/auth';
import { UsuariosActions } from './usuarios.actions';

export const USUARIOS_FEATURE_KEY = 'usuarios';

export interface UsuariosState extends EntityState<User> {
  isLoading: boolean;
  error: unknown | null;
}

const adapter = createEntityAdapter<User>({ selectId: (u) => u.username });

const initialState: UsuariosState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

const reducer = createReducer(
  initialState,
  on(UsuariosActions.load, (state) => ({ ...state, isLoading: true, error: null })),
  on(UsuariosActions.loadSuccess, (state, { usuarios }) => adapter.setAll(usuarios, { ...state, isLoading: false })),
  on(UsuariosActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(UsuariosActions.create, (state) => ({ ...state, isLoading: true })),
  on(UsuariosActions.createSuccess, (state, { usuario }) => adapter.addOne(usuario, { ...state, isLoading: false })),
  on(UsuariosActions.createFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(UsuariosActions.update, (state) => ({ ...state, isLoading: true })),
  on(UsuariosActions.updateSuccess, (state, { usuario }) => adapter.upsertOne(usuario, { ...state, isLoading: false })),
  on(UsuariosActions.updateFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(UsuariosActions.delete, (state) => ({ ...state, isLoading: true })),
  on(UsuariosActions.deleteSuccess, (state, { username }) => adapter.removeOne(username, { ...state, isLoading: false })),
  on(UsuariosActions.deleteFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);

export const usuariosFeature = createFeature({
  name: USUARIOS_FEATURE_KEY,
  reducer,
});

export const {
  name: usuariosFeatureKey,
  reducer: usuariosReducer,
  selectUsuariosState,
} = usuariosFeature;

export const {
  selectAll: selectAllUsuarios,
  selectEntities: selectUsuariosEntities,
  selectIds: selectUsuariosIds,
  selectTotal: selectUsuariosTotal,
} = adapter.getSelectors(selectUsuariosState);

export const selectUsuariosIsLoading = (state: UsuariosState) => state.isLoading;
export const selectUsuariosError = (state: UsuariosState) => state.error;


