import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CargarClientes } from '../interfaces/cargarClientes.interface';
import { map } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Clientes } from '../models/clientes.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( public http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarCliente(desde: number = 0) {
      
    const url = `${base_url}/clientes?desde=${desde}`;
    return this.http.get<CargarClientes>(url, this.headers)
      .pipe(
        map( resp => {
          const clientes = resp.clientes.map(
            clientes => new Clientes(clientes.nombre, clientes.dni, clientes.telefono, clientes.email, clientes.domicilio, clientes.observaciones, clientes._id, clientes.usuario)).sort(function(a, b) {if (a.nombre > b.nombre) {return 1;} if (a.nombre < b.nombre) {return -1;} return 0;});
            
          return {
            total: resp.total,
            clientes
          };
        })
      )
  }

  getClientes(desde: number = 0) {
    const url = `${base_url}/clientes?desde=${desde}`;
    return this.http.get<CargarClientes>(url, this.headers)
      .pipe(
      map( resp => resp['clientes'] )
    )
  }

  eliminarCliente(cliente: Clientes) {
    
    const url = `${base_url}/clientes/${cliente._id  }`;
      return this.http.delete( url, this.headers);
  }

  crearCliente (formData: RegisterForm) {
      
    return this.http.post(`${base_url}/clientes`, formData);
  }

  actualizarCliente(clientes: Clientes) {
    const url = `${base_url}/clientes/${clientes._id}`
    return this.http.put(url, clientes, this.headers)
  }

  obtenerClientePorId( id: string ) {

    const url = `${ base_url }/clientes/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map((resp: any) => resp.cliente)
      );
              
  }



}
