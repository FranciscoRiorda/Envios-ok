import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  private _ocultarModal: boolean = true;
  

  public tipo!: 'usuarios';
  public id!: string;
  public img!: string;


  get ocultarModal() {
    return this._ocultarModal;
  }


  abrirModal(
    tipo: 'usuarios',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = `${base_url}/uploads/${tipo}/${img}`;
    console.log(this.img);
  }

  
  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
