
import { createReducer, on } from '@ngrx/store';
import {
    currentUser
} from './actions';

export const MSAL_FEATURE_KEY = 'msal';

export interface MsalState {
  activeUserName?: string;
}

export const initialMsalState: MsalState = {
    activeUserName: undefined,
};

export const msalReducer = createReducer(
    initialMsalState,
    on(currentUser, (state, { userName }) => {
      return {
        activeUserName: userName
      };
    })
);