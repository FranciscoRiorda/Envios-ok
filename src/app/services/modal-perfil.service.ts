import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment;

@Injectable({
  providedIn: 'root'
})
export class ModalPerfilService {

  private _ocultarModalPerfil: boolean = true;

  public tipo!: 'usuarios';
  public id!: string;
  public img!: string;


  get ocultarModalPerfil() {
    return this._ocultarModalPerfil;
  }


  abrirModalPerfil(
    tipo: 'usuarios',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModalPerfil = false;
    this.tipo = tipo;
    this.id = id;
    this.img = `${base_url}/uploads/${tipo}/${img}`;
    console.log(this.id);
  }


  cerrarModalPerfil() {
    this._ocultarModalPerfil = true;
  }


  constructor() { }
  
}
