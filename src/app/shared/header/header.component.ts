import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imgUrl: any;
  public nombreUser: any;
  public apellidoUser: any;
  public mailUser: any;

  constructor( private usuarioService: UsuarioService) {

    this.imgUrl = usuarioService.usuario?.imagenUrl;
    this.nombreUser = usuarioService.usuario?.nombre;
    this.apellidoUser = usuarioService.usuario?.apellido;
    this.mailUser = usuarioService.usuario?.email; 
   }

  logout() {
    this.usuarioService.logout();
  }

}
