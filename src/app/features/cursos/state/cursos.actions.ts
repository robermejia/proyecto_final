import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../../shared/entities';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ cursos: Course[] }>(),
    'Load Failure': props<{ error: unknown }>(),
  },
});


