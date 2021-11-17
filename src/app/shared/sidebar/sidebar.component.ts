import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  
  // menuItems: any[];
  // menuItems2: any[];

  public imgUrl: any;
  public nombreUser: any;
  public apellidoUser: any;

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService) { 

    this.imgUrl = usuarioService.usuario?.imagenUrl;
    this.nombreUser = usuarioService.usuario?.nombre;
    this.apellidoUser = usuarioService.usuario?.apellido;

    // this.menuItems = sidebarService.menu;

    // this.menuItems2 = sidebarService.menu2;
  }

  logout() {
    this.usuarioService.logout();
  }


}
