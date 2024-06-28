import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsalCustomService {

    constructor(
        private authService: MsalService,
        public msalBroadcastService: MsalBroadcastService
      ) {}


    
  checkLogin() : Observable<string> {
    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        }
      });


    return this.msalBroadcastService.inProgress$
    .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        map((_) => { 
            this.checkAndSetActiveAccount();
            return this.authService.instance.getAllAccounts()[0].name || '';
        })
      );
  }


  public logout(): void {
    this.authService.logout();
  }
  private checkAndSetActiveAccount() {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }
}
