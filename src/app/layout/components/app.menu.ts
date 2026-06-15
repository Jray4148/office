import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MenuItem} from "primeng/api";
import {PanelMenu} from "primeng/panelmenu";

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, RouterModule, PanelMenu],
    templateUrl: './app.menu.html'
})
export class AppMenu implements OnInit{
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [{
            label: "EFile",
            items: [{
                 label: "List",
                routerLink: ['/list']
            }]
        }]
    }
}
