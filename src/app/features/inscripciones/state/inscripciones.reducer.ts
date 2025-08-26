import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Inscripcion } from '../../../../shared/entities';
import { InscripcionesActions } from './inscripciones.actions';

export const INSCRIPCIONES_FEATURE_KEY = 'inscripciones';

export interface InscripcionesState extends EntityState<Inscripcion> {
  isLoading: boolean;
  error: unknown | null;
}

const adapter = createEntityAdapter<Inscripcion>({ selectId: (i) => i.id as string });

const initialState: InscripcionesState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

const reducer = createReducer(
  initialState,
  on(InscripcionesActions.load, (state) => ({ ...state, isLoading: true, error: null })),
  on(InscripcionesActions.loadSuccess, (state, { inscripciones }) =>
    adapter.setAll(inscripciones, { ...state, isLoading: false })
  ),
  on(InscripcionesActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(InscripcionesActions.create, (state) => ({ ...state, isLoading: true })),
  on(InscripcionesActions.createSuccess, (state, { inscripcion }) =>
    adapter.addOne(inscripcion, { ...state, isLoading: false })
  ),
  on(InscripcionesActions.createFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(InscripcionesActions.updateEstado, (state) => ({ ...state, isLoading: true })),
  on(InscripcionesActions.updateEstadoSuccess, (state, { inscripcion }) =>
    adapter.upsertOne(inscripcion, { ...state, isLoading: false })
  ),
  on(InscripcionesActions.updateEstadoFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(InscripcionesActions.delete, (state) => ({ ...state, isLoading: true })),
  on(InscripcionesActions.deleteSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, isLoading: false })
  ),
  on(InscripcionesActions.deleteFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);

export const inscripcionesFeature = createFeature({
  name: INSCRIPCIONES_FEATURE_KEY,
  reducer,
});

export const {
  name: inscripcionesFeatureKey,
  reducer: inscripcionesReducer,
  selectInscripcionesState,
} = inscripcionesFeature;

export const {
  selectAll: selectAllInscripciones,
  selectEntities: selectInscripcionesEntities,
  selectIds: selectInscripcionesIds,
  selectTotal: selectInscripcionesTotal,
} = adapter.getSelectors(selectInscripcionesState);

export const selectInscripcionesIsLoading = (state: InscripcionesState) => state.isLoading;
export const selectInscripcionesError = (state: InscripcionesState) => state.error;


