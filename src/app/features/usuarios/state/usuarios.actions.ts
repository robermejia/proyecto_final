import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../core/auth/auth';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ usuarios: User[] }>(),
    'Load Failure': props<{ error: unknown }>(),

    'Create': props<{ usuario: User }>(),
    'Create Success': props<{ usuario: User }>(),
    'Create Failure': props<{ error: unknown }>(),

    'Update': props<{ username: string; usuario: User }>(),
    'Update Success': props<{ usuario: User }>(),
    'Update Failure': props<{ error: unknown }>(),

    'Delete': props<{ username: string }>(),
    'Delete Success': props<{ username: string }>(),
    'Delete Failure': props<{ error: unknown }>(),
  },
});


