import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { RendimientosService } from '../../services/rendimientos.service';
import { GastosService } from '../../services/gastos.service';
import { Gastos } from 'src/app/models/gastos.model';
import { PedidosService } from '../../services/pedidos.service';
import { Pedidos } from 'src/app/models/pedidos.model';
import { ClientesService } from '../../services/clientes.service';
import { Clientes } from 'src/app/models/clientes.model';
import { UsuarioService } from '../../services/usuario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-rendimientos',
  templateUrl: './rendimientos.component.html',
  styles: [
  ]
})
export class RendimientosComponent implements OnInit {

  
  public cargando: boolean = true;
  
  public totalIngresos: number = 0;
  public totalIngresos2: Pedidos[] = [];
  public ingresoTemp: Pedidos[] = [];

  public totalGastos: number = 0;
  public totalGastos2: Gastos[] = [];
  public gastosTemp: Gastos[] = [];
  
  public desde: number = 0;

  public gastosMesTemp: Gastos[] = [];
  public ingresoMesTemp: Pedidos[] = [];
  public gastosMesTemp2: Gastos[] = [];
  public ingresoMesTemp2: Pedidos[] = [];
  public gastoMes: Gastos[] = [];
  public ingresoMes: Pedidos[] = [];
  public gastoMes2: Gastos[] = [];
  public ingresoMes2: Pedidos[] = [];

  public totalClientes: number = 0;

  public activoTotal: number = 0;

  public totalUsuarios: number = 0;

  public totalEnvios: number = 0;
  public totalEnvios2: number = 0;

  public fechaInicial!: any;
  public fechaFinal!: any;
  public fechaInicial2!: any;
  public fechaFinal2!: any;

  progreso: number = 0;
  progresoIngreso: number = 0;
  progreso2: number = 0;
  progresoIngreso2: number = 0;
  

  getPorcentaje() {
    return `${this.progreso}%`;
  }

  getPorcentajeIngreso(){
    return `${this.progresoIngreso}%`
  }

  getPorcentaje2() {
    return `${this.progreso2}%`;
  }

  getPorcentajeIngreso2(){
    return `${this.progresoIngreso2}%`
  }

  getPorcentaje1() {
    return `${this.progreso}`;
  }

  getPorcentajeIngreso1(){
    console.log(this.progresoIngreso)
    return `${this.progresoIngreso}`
  }

  getPorcentaje11() {
    return `${this.progreso2}`;
  }

  getPorcentajeIngreso11(){
    return `${this.progresoIngreso2}`
  }


  
  constructor(private gastosService: GastosService,
              private pedidosService: PedidosService,
              private clientesService: ClientesService,
              private usuarioService: UsuarioService) {}

  
  ngOnInit(): void {
    this.ingresosTotales();
    this.gastosTotales();
    this.activosTotales();
    this.cargarUsuario();

  }

//REPORTE DE ARRIBA - CANTIDAD DE ENVIO, PERSONAL, CLIENTES Y ACTIVOS

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

  return this.activoTotal;
  
}

cargarClientes() {

  this.cargando = true;

  this.clientesService.cargarCliente(this.desde)
    .subscribe(({total}) => {
      this.totalClientes = total;

      this.activosTotales();
    })
}


cargarUsuario() {

  this.cargando = true;

  this.usuarioService.cargarUsuario(this.desde)
    .subscribe(({total}) => {
      this.totalUsuarios = total;
    
    })
}

// REPORTES MENSSUALES POR FECHA

cargarGastosPorMes() {   
    
  this.gastosService.cargarGastoPorFecha(this.fechaInicial, this.fechaFinal)
    .subscribe((gastoMes) => {
      
      this.gastoMes = gastoMes;
      this.gastosMesTemp = gastoMes;

      this.progressGastos();

      
    })    

}

cargarGastosPorMes2() {   
    
  this.gastosService.cargarGastoPorFecha(this.fechaInicial2, this.fechaFinal2)
    .subscribe((gastoMes2) => {
      
      this.gastoMes2 = gastoMes2;
      this.gastosMesTemp2 = gastoMes2;

      this.progressGastos2();
      
    })    
}

cargarPedidosPorMes() {   
    
  this.pedidosService.cargarPedidoPorFecha(this.fechaInicial, this.fechaFinal)
    .subscribe((ingresoMes) => {
      
      this.ingresoMes = ingresoMes;
      this.ingresoMesTemp2 = ingresoMes;

      this.progressIngresos();

    })    
}

cargarPedidosPorMes2() {   
    
  this.pedidosService.cargarPedidoPorFecha(this.fechaInicial2, this.fechaFinal2)
    .subscribe((ingresoMes2) => {
      
      this.ingresoMes2 = ingresoMes2;
      this.ingresoMesTemp2 = ingresoMes2;

      
      this.progressIngresos2();
    })    
}

totalGasto():any{
    
  let total=0;
  this.gastoMes.forEach(t => {
    total += t.importe;
  });
  return total;
}

totalIngreso():any{
  
  let total=0;
  this.ingresoMes.forEach(t => {
    total += t.costoEnvio;
  });
  this.totalEnvios = this.ingresoMes.length;
  return total;
}

totalGasto3():any{
    
  let total=0;
  this.gastoMes2.forEach(t => {
    total += t.importe;
  });  
  return total;
}

totalIngreso3():any{
  
  let total=0;
  this.ingresoMes2.forEach(t => {
    total += t.costoEnvio;
  });
  this.totalEnvios2 = this.ingresoMes2.length;
  return total;
}

//BARRA DE PROGRESO//

progressGastos():any{
  let gastoTotal = this.totalGasto();
  let ingresoTotal = this.totalIngreso();
  let total = this.totalIngreso() + this.totalGasto();
  
  if(gastoTotal === 0){
    this.progreso = 0;
    this.progresoIngreso = 100;
  }else if(ingresoTotal === 0){
    this.progreso = 100;
    this.progresoIngreso = 0;
  } else {
    this.progreso = (gastoTotal * 100) / total;
    this.progresoIngreso = 100 - this.progreso;
  }

  return this.progreso;
}

progressGastos2():any{
  let gastoTotal3 = this.totalGasto3();
  let ingresoTotal3 = this.totalIngreso3();
  let total3 = this.totalIngreso3() + this.totalGasto3();
  
  if(gastoTotal3 === 0){
    this.progreso2 = 0;
    this.progresoIngreso2 = 100;
  }else if(ingresoTotal3 === 0){
    this.progreso2 = 100;
    this.progresoIngreso2 = 0;
  } else {
    this.progreso2 = (gastoTotal3 * 100) / total3;
    this.progresoIngreso2 = 100 - this.progreso2;
  }

  return this.progreso2;
}

progressIngresos():any{
  let ingresoTotal = this.totalIngreso();
  let gastoTotal = this.totalGasto();
  let total = this.totalIngreso() + this.totalGasto();
  
  if(ingresoTotal === 0){
    this.progresoIngreso = 0;
    this.progreso = 100;
  }else if(gastoTotal === 0){
    this.progresoIngreso = 100;
    this.progreso = 0;
  }else {    
    this.progresoIngreso = (ingresoTotal * 100) / total;
    this.progreso = 100 - this.progresoIngreso;
  }

  return this.progresoIngreso;
}

progressIngresos2():any{
  let ingresoTotal3 = this.totalIngreso3();
  let gastoTotal3 = this.totalGasto3();
  let total3 = this.totalIngreso3() + this.totalGasto3();
  
  if(ingresoTotal3 === 0){
    this.progresoIngreso2 = 0;
    this.progreso2 = 100;
  }else if(gastoTotal3 === 0){
    this.progresoIngreso2 = 100;
    this.progreso2 = 0;
  }else {    
    this.progresoIngreso2 = (ingresoTotal3 * 100) / total3;
    this.progreso2 = 100 - this.progresoIngreso2;
  }

  return this.progresoIngreso2;
}










}
