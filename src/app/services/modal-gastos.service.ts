import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalGastosService {

  private _ocultarModalGastos: boolean = true;

  get ocultarModalGastos() {
    return this._ocultarModalGastos;
  }

  abrirModalGastos(){
    this._ocultarModalGastos = false;
  }

  cerrarModalGastos() {
    this._ocultarModalGastos = true;
  }

  constructor() { }
}
