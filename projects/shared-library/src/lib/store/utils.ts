import { StoreModule } from '@ngrx/store';
import { MSAL_FEATURE_KEY, msalReducer } from './reducers';


export function getStoreModule(): any {
    return StoreModule.forRoot({
        [MSAL_FEATURE_KEY]: msalReducer});
}