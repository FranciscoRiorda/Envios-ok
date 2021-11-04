import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { RendimientosService } from '../../services/rendimientos.service';
import { GastosService } from '../../services/gastos.service';
import { Gastos } from 'src/app/models/gastos.model';
import { PedidosService } from '../../services/pedidos.service';
import { Pedidos } from 'src/app/models/pedidos.model';
import { ClientesService } from '../../services/clientes.service';
import { Clientes } from 'src/app/models/clientes.model';

@Component({
  selector: 'app-rendimientos',
  templateUrl: './rendimientos.component.html',
  styles: [
  ]
})
export class RendimientosComponent implements OnInit {

  
  public cargando: boolean = true;
  
  public fechaRend: string | undefined;
  public data: Gastos[] = [];
  public data2: Pedidos[] = [];
  public reporteTemp: Gastos[] = [];

  public totalIngresos: number = 0;
  public totalIngresos2: Pedidos[] = [];
  public ingresoTemp: Pedidos[] = [];
  public desde: number = 0;
  
  public totalGastos: number = 0;
  public totalGastos2: Gastos[] = [];
  public gastosTemp: Gastos[] = [];

  public totalClientes: number = 0;
  public clientes: Clientes[] = [];
  public clientesTemp: Clientes[] = [];

  public activoTotal: number = 0;

  progreso: number = 0;
  progresoIngreso: number = 0;
  

  getPorcentaje() {
    return `${this.progreso}%`;
  }

  getPorcentajeIngreso(){
    return `${this.progresoIngreso}%`
  }


  periodos = [{
    nombre: 'Agosto 2021',
    value: '2021-08-01/2021-08-31'
  },
  {
    nombre: 'Septiembre 2021',
    value: '2021-09-01/2021-09-30'
  },
  {
    nombre: 'Octubre 2021',
    value: '2021-10-01/2021-10-31'
  },
  {
    nombre: 'Noviembre 2021',
    value: '2021-11-01/2021-11-30'
  },
  {
    nombre: 'Diciembre 2021',
    value: '2021-12-01/2021-12-31'
  },
  {
    nombre: 'Enero 2022',
    value: '2022-01-01/2022-01-31'
  },
  {
    nombre: 'Febrero 2022',
    value: '2022-02-01/2022-02-29'
  },
  {
    nombre: 'Marzo 2022',
    value: '2022-03-01/2022-03-31'
  },
  {
    nombre: 'Abril 2022',
    value: '2022-04-01/2022-04-30'
  },
  {
    nombre: 'Mayo 2022',
    value: '2022-05-01/2022-05-31'
  },
  {
    nombre: 'Junio 2022',
    value: '2022-06-01/2022-06-30'
  },
  {
    nombre: 'Julio 2022',
    value: '2022-07-01/2022-07-31'
  },
 
]

  
  constructor(private gastosService: GastosService,
              private pedidosService: PedidosService,
              private clientesService: ClientesService) {}

  
  ngOnInit(): void {
    this.ingresosTotales();
    this.gastosTotales();
    this.activosTotales();

  }
  
  buscarReporte() {

    this.cargando = true;
    
    this.gastosService.rendimientosPorFecha(this.fechaRend)
      .subscribe((data) => {
        // console.log('data', data);
        
        this.data = data;
        this.reporteTemp = data;
        this.progressGastos();
        this.progressIngresos();
      });
  }

  buscarReporte2() {

    this.cargando = true;
    
    this.pedidosService.rendimientosPorFecha(this.fechaRend)
      .subscribe((data2) => {
        console.log('data2', data2);
        
        this.data2 = data2;
        this.reporteTemp = data2;
        this.progressIngresos();
        this.progressGastos();
      });
  }

  totalGasto():any{
    
    let total=0;
    this.data.forEach(t => {
      total += t.importe;
    })
    
    return total;
  }

  totalIngreso():any{
    
    let total=0;
    this.data2.forEach(t => {
      total += t.costoEnvio;
    });
    return total;
}

progressGastos():any{
  let gastoTotal = this.totalGasto();
  let ingresoTotal = this.totalIngreso();
  let total = this.totalIngreso() + this.totalGasto();
  
  if(gastoTotal == 0){
    this.progreso = 0;
  }else if(ingresoTotal == 0){
    this.progreso = 100;
  } else {
    this.progreso = (gastoTotal * 100) / total;
  }

  return this.progreso;
}

progressIngresos():any{
  let ingresoTotal = this.totalIngreso();
  let gastoTotal = this.totalGasto();
  let total = this.totalIngreso() + this.totalGasto();
  
  if(ingresoTotal == 0){
    this.progresoIngreso = 0;
  }else if(gastoTotal == 0){
    this.progresoIngreso = 100 ;
  }else {    
    this.progresoIngreso = (ingresoTotal * 100) / total;
  }

  return this.progresoIngreso;
}

ingresosTotales(){
  
  this.pedidosService.cargarPedido2(this.desde)
  .subscribe(({total, pedidos}) => {
        
    this.totalIngresos = total;
    this.totalIngresos2 = pedidos;
    this.ingresoTemp = pedidos;
    
    this.totalIngreso2();
    this.cargarClientes();
    })

}

gastosTotales(){
  
  this.gastosService.cargarGasto2(this.desde)
  .subscribe(({total, gastos}) => {
        
    this.totalGastos = total;
    this.totalGastos2 = gastos;
    this.gastosTemp = gastos;
    
    this.totalGasto2();
    
    })

}

totalGasto2():any{
    
  let total=0;
  this.totalGastos2.forEach(t => {
    total += t.importe;
  })
  
  return total;
}

totalIngreso2():any{
  
  let total=0;
  this.totalIngresos2.forEach(t => {
    total += t.costoEnvio;
  });
  return total;
}

 activosTotales(){

  this.activoTotal = this.totalIngreso2() - this.totalGasto2();

  console.log(this.activoTotal)
  return this.activoTotal;
  
}

cargarClientes() {

  this.cargando = true;

  this.clientesService.cargarCliente(this.desde)
    .subscribe(({total, clientes}) => {
      this.totalClientes = total;
      this.clientes = clientes;
      this.clientesTemp = clientes;

      this.activosTotales();
    })
}




}
