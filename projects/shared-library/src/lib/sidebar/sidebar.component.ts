import { Component, Input } from "@angular/core";
import { LibRoute } from "../interfaces/route.interface";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'sidebar-component',
    standalone: true,
    imports: [ RouterModule, BrowserModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
  })
  export class SidebarComponent {

    @Input() routes!: LibRoute[];
  }