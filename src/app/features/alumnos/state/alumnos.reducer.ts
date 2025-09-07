import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Student } from '../../../../shared/entities';
import { AlumnosActions } from './alumnos.actions';

export const ALUMNOS_FEATURE_KEY = 'alumnos';

export interface AlumnosState extends EntityState<Student> {
  isLoading: boolean;
  error: unknown | null;
}

const alumnosAdapter = createEntityAdapter<Student>({
  selectId: (s) => s.id ?? s.dni.toString(),
});

const initialState: AlumnosState = alumnosAdapter.getInitialState({
  isLoading: true, // Iniciar en true para mostrar loading al cargar la página
  error: null,
});

const reducer = createReducer(
  initialState,
  on(AlumnosActions.load, (state) => ({ ...state, isLoading: true, error: null })),
  on(AlumnosActions.loadSuccess, (state, { alumnos }) =>
    alumnosAdapter.setAll(alumnos, { ...state, isLoading: false })
  ),
  on(AlumnosActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(AlumnosActions.delete, (state) => ({ ...state, isLoading: true })),
  on(AlumnosActions.deleteSuccess, (state, { student }) =>
    alumnosAdapter.removeOne(student.id ?? student.dni.toString(), { ...state, isLoading: false })
  ),
  on(AlumnosActions.deleteFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(AlumnosActions.update, (state) => ({ ...state, isLoading: true })),
  on(AlumnosActions.updateSuccess, (state, { student }) =>
    alumnosAdapter.upsertOne(student, { ...state, isLoading: false })
  ),
  on(AlumnosActions.updateFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);

export const alumnosFeature = createFeature({
  name: ALUMNOS_FEATURE_KEY,
  reducer,
});

export const {
  name: alumnosFeatureKey,
  reducer: alumnosReducer,
  selectAlumnosState,
} = alumnosFeature;

export const {
  selectIds: selectAlumnoIds,
  selectEntities: selectAlumnoEntities,
  selectAll: selectAllAlumnos,
  selectTotal: selectAlumnosTotal,
} = alumnosAdapter.getSelectors(selectAlumnosState);

export const selectAlumnosIsLoading = alumnosFeature.selectIsLoading;
export const selectAlumnosError = alumnosFeature.selectError;



