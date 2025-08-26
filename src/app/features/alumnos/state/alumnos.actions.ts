import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../../../shared/entities';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ alumnos: Student[] }>(),
    'Load Failure': props<{ error: unknown }>(),

    'Delete': props<{ student: Student }>(),
    'Delete Success': props<{ student: Student }>(),
    'Delete Failure': props<{ error: unknown }>(),

    'Update': props<{ student: Student }>(),
    'Update Success': props<{ student: Student }>(),
    'Update Failure': props<{ error: unknown }>(),
  },
});


