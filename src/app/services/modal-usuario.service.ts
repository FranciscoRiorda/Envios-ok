import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUsuarioService {

  private _ocultarModalUsuario: boolean = true;

  get ocultarModalUsuario() {
    return this._ocultarModalUsuario;
  }

  abrirModalUsuario(){
    this._ocultarModalUsuario = false;
  }

  cerrarModalUsuario() {
    this._ocultarModalUsuario = true;
  }

  constructor() { }
}
