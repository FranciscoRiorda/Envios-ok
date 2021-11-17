import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TerminosGuard implements CanActivate {

  public usuario: Usuario | undefined;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      if (this.usuarioService.usuario.terminos !== 'false') {
        return true;
      } else {
        this.router.navigateByUrl('dashboard/terminosYcondiciones');
        return false;
      }

  }

//   return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false ==> es lo mismo a lo de arriba
  
}
