import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MSAL_FEATURE_KEY, MsalState } from './reducers';

export const selectMsalState =
  createFeatureSelector<MsalState>(MSAL_FEATURE_KEY);

export const activeUSer = createSelector(
  selectMsalState,
  ({ activeUserName }) => activeUserName
);