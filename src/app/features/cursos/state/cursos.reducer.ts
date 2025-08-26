import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../../../../shared/entities';
import { CursosActions } from './cursos.actions';

export const CURSOS_FEATURE_KEY = 'cursos';

export interface CursosState extends EntityState<Course> {
  isLoading: boolean;
  error: unknown | null;
}

const cursosAdapter = createEntityAdapter<Course>({
  selectId: (c) => (c as any).id ?? c.id,
});

const initialState: CursosState = cursosAdapter.getInitialState({
  isLoading: false,
  error: null,
});

const reducer = createReducer(
  initialState,
  on(CursosActions.load, (state) => ({ ...state, isLoading: true, error: null })),
  on(CursosActions.loadSuccess, (state, { cursos }) =>
    cursosAdapter.setAll(cursos, { ...state, isLoading: false })
  ),
  on(CursosActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);

export const cursosFeature = createFeature({
  name: CURSOS_FEATURE_KEY,
  reducer,
});

export const {
  name: cursosFeatureKey,
  reducer: cursosReducer,
  selectCursosState,
} = cursosFeature;

export const {
  selectAll: selectAllCursos,
  selectEntities: selectCursosEntities,
  selectIds: selectCursosIds,
  selectTotal: selectCursosTotal,
} = cursosAdapter.getSelectors(selectCursosState);

export const selectCursosIsLoading = (state: CursosState) => state.isLoading;
export const selectCursosError = (state: CursosState) => state.error;


