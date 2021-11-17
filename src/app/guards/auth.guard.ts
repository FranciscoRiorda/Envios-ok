import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //inyectamos el servicio en el constructor
  constructor(private usuarioService: UsuarioService,
              private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.usuarioService.validarToken()
        .pipe(
          tap(estaAutenticado => {
            
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }
          })
        )
  }
  
}


//Guard para proteger las rutas. Que nadie pueda ingresar sin validar el token y esté autenticado.