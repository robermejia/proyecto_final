import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { User } from '../core/auth/auth';

export const APP_FEATURE_KEY = 'app';

export interface AppState {
  currentUser: User | null;
  currentTitle: string;
}

export const initialState: AppState = {
  currentUser: null,
  currentTitle: 'AppCoderHouse',
};

const reducer = createReducer(
  initialState,
  on(AppActions.setUser, (state, { user }) => ({ ...state, currentUser: user })),
  on(AppActions.clearUser, (state) => ({ ...state, currentUser: null })),
  on(AppActions.setTitle, (state, { title }) => ({ ...state, currentTitle: title })),
);

export const appFeature = createFeature({
  name: APP_FEATURE_KEY,
  reducer,
});

export const {
  name: appFeatureKey,
  reducer: appReducer,
  selectAppState,
  selectCurrentUser,
  selectCurrentTitle,
} = appFeature;


