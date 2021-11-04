import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalClientesService {

  private _ocultarModalClientes: boolean = true;

  get ocultarModalClientes() {
    return this._ocultarModalClientes;
  }

  abrirModalClientes(){
    this._ocultarModalClientes = false;
  }

  cerrarModalClientes() {
    this._ocultarModalClientes = true;
  }

  constructor() { }
}
