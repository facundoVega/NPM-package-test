import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { activeUSer } from "../store/selectors";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'header-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
  })
  export class HeaderComponent implements OnInit {
    @Input() store!: Store;
    $user!: Observable<string | undefined>
    ngOnInit(): void {
      if(this.store)  {
        this.$user =  this.store.select(activeUSer)
      }
      
    }
  }