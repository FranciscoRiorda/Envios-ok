import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

// @ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

  year = new Date().getFullYear();

}
