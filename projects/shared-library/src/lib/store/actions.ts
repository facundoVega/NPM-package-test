import { createAction, props } from '@ngrx/store';


export const currentUser = createAction(
    '[MSAL] User',
    props<{ userName: string }>()
  );