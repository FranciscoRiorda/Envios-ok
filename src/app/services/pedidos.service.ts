import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarPedidos } from '../interfaces/cargarPedidos.interface';
import { map } from 'rxjs/operators';
import { Pedidos } from '../models/pedidos.model';
import { PedidosForm } from '../interfaces/pedidos-form.interface';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { estadoPedido } from '../interfaces/estadoPedido.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  public total: number = 0;
  public usuarios: Usuario[] | undefined;
  public pedidos: Pedidos[] | undefined;

  constructor( private http: HttpClient) { }

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

  cargarPedido(desde: number = 0) {
      
    const url = `${base_url}/pedidos?desde=${desde}`;
    return this.http.get<CargarPedidos>(url, this.headers)
      .pipe(
        map( resp => {
          const pedidos = resp.pedidos.map(
            pedidos => new Pedidos(pedidos.nombreCliente, pedidos.mailCliente, pedidos.diaRetiro, pedidos.domicilioRetiro, pedidos.telEntregaPaq, pedidos.estadoRetiro, pedidos.diaEntrega, pedidos.domicilioEntrega, pedidos.telRecibePaq, pedidos.estadoEntrega, pedidos.costoEnvio, pedidos.observaciones, pedidos._id, pedidos.usuario)).sort(((a, b) => new Date(b.diaRetiro).getTime() - new Date(a.diaRetiro).getTime()));
            // .sort(((a, b) => b.numPedido - a.numPedido));
          return {
            total: resp.total,
            pedidos
          };
        })
      )
  }

  cargarPedido2(desde: number = 0) {
      
    const url = `${base_url}/pedidos/pedidos2?desde=${desde}`;
    return this.http.get<CargarPedidos>(url, this.headers)
      .pipe(
        map( resp => {
          const pedidos = resp.pedidos.map(
            pedidos => new Pedidos(pedidos.nombreCliente, pedidos.mailCliente, pedidos.diaRetiro, pedidos.domicilioRetiro, pedidos.telEntregaPaq, pedidos.estadoRetiro, pedidos.diaEntrega, pedidos.domicilioEntrega, pedidos.telRecibePaq, pedidos.estadoEntrega, pedidos.costoEnvio, pedidos.observaciones, pedidos._id, pedidos.usuario)).sort(((a, b) => new Date(b.diaRetiro).getTime() - new Date(a.diaRetiro).getTime()));
            // .sort(((a, b) => b.numPedido - a.numPedido));
          return {
            total: resp.total,
            pedidos
          };
        })
      )
  }

  obtenerPedidoPorId( id: string ) {

    const url = `${ base_url }/pedidos/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map((resp: any) => resp.pedido)
      );
              
  }

  cargarPedidoPorFecha(fechaInicial: Date, fechaFinal: Date): Observable<any> {
  
    const url = `${base_url}/pedidos/fecha/${fechaInicial}/${fechaFinal}`;
    return this.http.get(url, this.headers);
  }

  cargarPedidosPendientes(): Observable<any> {
  
    const url = `${base_url}/pedidos/estado/Pendiente`;
    return this.http.get(url, this.headers);
  }

  cargarPedidosRetirados(): Observable<any> {
  
    const url = `${base_url}/pedidos/estado/Retirado`;
    return this.http.get(url, this.headers);
  }

  cargarPedidosNoRetirados(): Observable<any> {
  
    const url = `${base_url}/pedidos/estado/No Retirado`;
    return this.http.get(url, this.headers);
  }

  cargarPedidosPendientesEntrega(): Observable<any> {
  
    const url = `${base_url}/pedidos/estadoEntrega/Pendiente`;
    return this.http.get(url, this.headers);
  }

  cargarPedidosEntregados(): Observable<any> {
  
    const url = `${base_url}/pedidos/estadoEntrega/Entregado`;
    return this.http.get(url, this.headers);
  }
  
  cargarPedidosNoEntregados(): Observable<any> {
  
    const url = `${base_url}/pedidos/estadoEntrega/No Entregado`;
    return this.http.get(url, this.headers);
  }
  
  crearPedido(formData: PedidosForm) {
  
    return this.http.post(`${base_url}/pedidos`, formData, this.headers);
  }

  rendimientosPorFecha(fechaRend: any): Observable<any> {
  
    const url = `${base_url}/pedidos/fecha/${fechaRend}`;
    return this.http.get(url, this.headers);
  }

//   actualizarPedidos(_id: string, diaRetiro: string, nombreCliente: string, mailCliente: string, domicilioRetiro: string, telEntregaPaq: string, estadoRetiro: string, diaEntrega: string, domicilioEntrega: string, telRecibePaq: number, estadoEntrega: string, costoEnvio: number, observaciones: string) {
  
//     const url = `${base_url}/pedidos/${_id}`;
//     return this.http.put(url, {diaRetiro, nombreCliente, mailCliente, domicilioRetiro, telEntregaPaq, estadoRetiro, diaEntrega, domicilioEntrega, telRecibePaq, estadoEntrega, costoEnvio, observaciones}, this.headers);
// }

actualizarPedidos(pedidos: Pedidos){

  const url = `${base_url}/pedidos/${pedidos._id}`;
  return this.http.put(url, pedidos, this.headers)

}

 eliminarPedido(_id: string) {
  
  const url = `${base_url}/pedidos/${_id}`;
  return this.http.delete(url, this.headers);
}

guardarPedido(pedido: Pedidos){

  const token = localStorage.getItem('token') || '';
  
  return this.http.put(`${base_url}/pedidos/${pedido._id}`, pedido, this.headers);

}

}
