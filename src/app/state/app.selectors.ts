import { createSelector } from '@ngrx/store';
import { selectAppState } from './app.reducer';

export const selectUser = createSelector(selectAppState, (s) => s.currentUser);
export const selectTitle = createSelector(selectAppState, (s) => s.currentTitle);


