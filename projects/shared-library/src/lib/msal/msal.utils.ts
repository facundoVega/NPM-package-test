import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";

export const msalGuardCanActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const msalGuard = inject(MsalGuard);
    return msalGuard.canActivate(route, state);
  };