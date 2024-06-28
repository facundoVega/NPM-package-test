import { StoreModule, StoreRootModule } from '@ngrx/store';
import { MSAL_FEATURE_KEY, msalReducer } from './reducers';
import { ModuleWithProviders } from '@angular/core';


export function getStoreModule(): ModuleWithProviders<StoreRootModule> {
    return StoreModule.forRoot({
        [MSAL_FEATURE_KEY]: msalReducer});
}