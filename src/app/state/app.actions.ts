import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../core/auth/auth';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Set User': props<{ user: User | null }>(),
    'Clear User': emptyProps(),
    'Set Title': props<{ title: string }>(),
  },
});


