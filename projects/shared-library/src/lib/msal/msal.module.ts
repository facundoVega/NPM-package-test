import { NgModule } from '@angular/core';
import { b2cPolicies, environment, msalConfig } from '../environment/environment';
import { InteractionType, IPublicClientApplication, PublicClientApplication, } from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: environment.scopes,
    },
    loginFailedRoute: '/login-failed',
  };
}



@NgModule({
  imports: [
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      {} as MsalInterceptorConfiguration
    )
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: 'b2cPolicies', useValue: b2cPolicies },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
})
export class msalAuthModule {
}
