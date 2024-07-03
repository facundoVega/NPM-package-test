import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { activeUSer } from "../store/selectors";
import { CommonModule } from "@angular/common";
import { MsalCustomService } from "../msal/msalCustom.service";
@Component({
    selector: 'header-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
  })
  export class HeaderComponent implements OnInit {

    private msalCustomService: MsalCustomService | undefined;
    constructor(msalCustomService: MsalCustomService) {
      this.msalCustomService = msalCustomService;
    }
    @Input() store!: Store;
    $user!: Observable<string | undefined>
    ngOnInit(): void {
      if(this.store)  {
        this.$user =  this.store.select(activeUSer)
      }
      
    }

    logout(): void {
      if (this.msalCustomService) {
        this.msalCustomService.logout();
      }
    }
  }