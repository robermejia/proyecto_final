import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion } from '../../../../shared/entities';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ inscripciones: Inscripcion[] }>(),
    'Load Failure': props<{ error: unknown }>(),

    'Create': props<{ inscripcion: Omit<Inscripcion, 'id'> }>(),
    'Create Success': props<{ inscripcion: Inscripcion }>(),
    'Create Failure': props<{ error: unknown }>(),

    'Update Estado': props<{ id: string; estado: 'activa' | 'cancelada' | 'completada' }>(),
    'Update Estado Success': props<{ inscripcion: Inscripcion }>(),
    'Update Estado Failure': props<{ error: unknown }>(),

    'Delete': props<{ id: string }>(),
    'Delete Success': props<{ id: string }>(),
    'Delete Failure': props<{ error: unknown }>(),
  }
});


