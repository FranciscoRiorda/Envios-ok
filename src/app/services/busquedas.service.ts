import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Gastos } from '../models/gastos.model';
import { Pedidos } from '../models/pedidos.model';
import { Clientes } from '../models/clientes.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

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

  //Debo generar un arreglo de usuarios para que en el buscador muestre el avatar
  private transformarUsuarios (resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.apellido, user.dni, user.telefono, user.email, user.domicilio, user.nacimiento, '', user.img, user.role, user.uid)
      );
  }

  private transformarGastos (resultados: any[]): Gastos[] {

    return resultados;
  }

  private transformarPedidos (resultados: any[]): Pedidos[] {

    return resultados;
  }

  private transformarClientes (resultados: any[]): Clientes[] {

    return resultados;
  }


  buscar(tipo: 'usuarios' | 'gastos' | 'pedidos' | 'envios' | 'clientes',
         termino: string) {
    
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map ((resp: any) => {
            
          switch (tipo) {
            case 'usuarios':
              console.log(resp.resultados);
              return this.transformarUsuarios(resp.resultados);

            case 'gastos':
                return this.transformarGastos(resp.resultados);
              
            case 'pedidos':
                return this.transformarPedidos(resp.resultados);

            case 'clientes':
                return this.transformarClientes(resp.resultados);
          
            default:
              return[];
              
          }
        })
      );
  }
  






}
