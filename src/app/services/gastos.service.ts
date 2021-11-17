import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Gastos } from '../models/gastos.model';
import { Usuario } from '../models/usuario.model';
import { CargarGastos } from '../interfaces/cargarGastos.interface';
import { GastosForm } from '../interfaces/gastos-form.interface';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  public total: number = 0;
  public usuarios: Usuario[] | undefined;
  public gastos: Gastos[] | undefined;

  
  constructor(private http: HttpClient,
              ) { }
  
  
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

  cargarGasto(desde: number = 0) {
      
    const url = `${base_url}/gastos?desde=${desde}`;
    return this.http.get<CargarGastos>(url, this.headers)
      .pipe(
        map( resp => {
          const gastos = resp.gastos.map(
            gasto => new Gastos(gasto.fecha, gasto.descripcion, gasto.importe, gasto._id));
            return {
              total: resp.total,
              sumatoria: resp.sumatoria,
              gastos
            };
          })
          )
          
        }

        cargarGasto2(desde: number = 0) {
      
          const url = `${base_url}/gastos/gastos2?desde=${desde}`;
          return this.http.get<CargarGastos>(url, this.headers)
            .pipe(
              map( resp => {
                const gastos = resp.gastos.map(
                  gasto => new Gastos(gasto.fecha, gasto.descripcion, gasto.importe, gasto._id));
                  return {
                    total: resp.total,
                    sumatoria: resp.sumatoria,
                    gastos
                  };
                })
                )
                
              }

  cargarGastosTotales(desde: number = 0) {
      
        const url = `${base_url}/gastos/gastosTotales?desde=${desde}`;
        return this.http.get<CargarGastos>(url, this.headers)
          .pipe(
            map( resp => {
              const gastos = resp.gastos.map(
                  gasto => new Gastos(gasto.fecha, gasto.descripcion, gasto.importe, gasto._id));
                  return {
                    total: resp.total,
                    gastos
                  };
                })
                )
                
              }


  cargarGastoPorFecha(fechaInicial: Date, fechaFinal: Date): Observable<any> {
  
          const url = `${base_url}/gastos/fecha/${fechaInicial}/${fechaFinal}`;
          return this.http.get(url, this.headers);
        }


  crearGasto(formData: GastosForm) {
  
    return this.http.post(`${base_url}/gastos`, formData, this.headers);
  }

  actualizarGasto(_id: string, fecha: string, descripcion: string, importe: number) {
  
    const url = `${base_url}/gastos/${_id}`;
    return this.http.put(url, {fecha, descripcion, importe}, this.headers);
}

 eliminarGasto(_id: string) {
  
  const url = `${base_url}/gastos/${_id}`;
  return this.http.delete(url, this.headers);
}

rendimientosPorFecha(fechaRend: any): Observable<any> {
  
  const url = `${base_url}/gastos/fecha/${fechaRend}`;
  return this.http.get(url, this.headers);
}


}
