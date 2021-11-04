import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RendimientosService {
  http: any;
  

  constructor() { }

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

  rendimientosPorFecha(fechaRend: Date): Observable<any> {
  
    const url = `${base_url}/gastos/fecha/${fechaRend}`;
    return this.http.get(url, this.headers);
  }
}
