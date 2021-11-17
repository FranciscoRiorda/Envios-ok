import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedidos } from '../../models/pedidos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registroEnvios',
  templateUrl: './registroEnvios.component.html',
  styles: [
  ]
})
export class RegistroEnviosComponent implements OnInit {

  public cargando: boolean = true;

  public pedidos: Pedidos[] = [];
  public data: Pedidos[] = [];

  public retirado: Pedidos[] = [];
  public pendiente: Pedidos[] = [];
  public noRetirado: Pedidos[] = [];
  public entregado: Pedidos[] = [];
  public pendienteEntrega: Pedidos[] = [];
  public noEntregado: Pedidos[] = [];

  public pedidosTemp: Pedidos[] = [];
  public pedidosTemp2: Pedidos[] = [];

  public totalIngresos: number = 0;

  public fechaInicial!: any;
  public fechaFinal!: any;
  public estadoRetiro!: any;

  public desde: number = 0;
  public totalPedidos: number = 0;

  constructor( private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.cargarPedidosPorMes();
    this.cargarPedidosPendientes();
    this.cargarPedidosRetirados();
    this.cargarPedidosNoRetirados();
    this.cargarPedidosPendientesEntrega();
    this.cargarPedidosEntregados();
    this.cargarPedidosNoEntregados();
  }

  refresh(): void { window.location.reload(); }

  totalIngreso():any{
    
    let total=0;
    this.data.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalPendiente():any{
    
    let total=0;
    this.pendiente.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalRetirado():any{
    
    let total=0;
    this.retirado.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalNoRetirado():any{
    
    let total=0;
    this.noRetirado.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalPendienteEntrega():any{
    
    let total=0;
    this.pendienteEntrega.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalEntregado():any{
    
    let total=0;
    this.entregado.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  totalNoEntregado():any{
    
    let total=0;
    this.noEntregado.forEach(t => {
      total += t.costoEnvio;
      console.log(total)
    });
    return total;
  }

  cargarPedidos() {
    this.cargando = true;

    this.pedidosService.cargarPedido(this.desde)
      .subscribe(({total, pedidos}) => {
        
        this.cargando = false;
        
        this.totalPedidos = total;
        this.pedidos = pedidos;
        this.pedidosTemp = pedidos;
        
        // console.log(this.totalPedidos);
        // console.log(pedidos);

      })
  }

  cargarPedidosPorMes() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidoPorFecha(this.fechaInicial, this.fechaFinal)
      .subscribe((data) => {
        
        this.data = data;
        this.pedidosTemp = data;
        // console.log(data)
      })    
  }

  cargarPedidosPendientes() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosPendientes()
      .subscribe((pendiente) => {
        // console.log('data', data);
        
        this.pendiente = pendiente;
        this.pedidosTemp = pendiente;
        // console.log(retirado);
      })    
  }

  cargarPedidosRetirados() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosRetirados()
      .subscribe((retirado) => {
        // console.log('data', data);
        
        this.retirado = retirado;
        this.pedidosTemp = retirado;
        // console.log(retirado);
      })    
  }

  cargarPedidosNoRetirados() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosNoRetirados()
      .subscribe((noRetirado) => {
        // console.log('data', data);
        
        this.noRetirado = noRetirado;
        this.pedidosTemp = noRetirado;
        // console.log(retirado);
      })    
  }

  cargarPedidosPendientesEntrega() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosPendientesEntrega()
      .subscribe((pendienteEntrega) => {
        // console.log('data', data);
        
        this.pendienteEntrega = pendienteEntrega;
        this.pedidosTemp2 = pendienteEntrega;
        // console.log(retirado);
      })    
  }

  cargarPedidosEntregados() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosEntregados()
      .subscribe((entregado) => {
        // console.log('data', data);
        
        this.entregado = entregado;
        this.pedidosTemp2 = entregado;
        // console.log(retirado);
      })    
  }

  cargarPedidosNoEntregados() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.pedidosService.cargarPedidosNoEntregados()
      .subscribe((noEntregado) => {
        // console.log('data', data);
        
        this.noEntregado = noEntregado;
        this.pedidosTemp2 = noEntregado;
        // console.log(retirado);
      })    
  }

  eliminarPedido(pedido: Pedidos) {

    Swal.fire({
      title: 'Estás seguro que deseas borrar el pedido seleccionado?',
      text: `Estás a punto de borrar el pedido de ${pedido.nombreCliente}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar pedido'
    }).then((result) => {
      if (result.value) {

        this.pedidosService.eliminarPedido(pedido._id!)
          .subscribe(resp => {
            this.cargarPedidosPendientes();
            this.cargarPedidosRetirados();
            this.cargarPedidosNoRetirados();
            this.cargarPedidosPendientesEntrega();
            this.cargarPedidosEntregados();
            this.cargarPedidosNoEntregados();
            Swal.fire('Borrado', pedido.nombreCliente, 'success')
          });
        
      }
    })
  
      
  }

  cambiarEstadoRetiro(pedido: Pedidos) {

    this.pedidosService.guardarPedido(pedido)
      .subscribe(resp => {
        Swal.fire(
          'Estado de retiro modificado',
          `El estado del pedido de ${pedido.nombreCliente} ha sido modificado`,
          'success'
          )
            this.cargarPedidosPendientes();
            this.cargarPedidosRetirados();
            this.cargarPedidosNoRetirados();
            this.cargarPedidosPendientesEntrega();
            this.cargarPedidosEntregados();
            this.cargarPedidosNoEntregados();
      });
    }

    cambiarEstadoEntrega(pedido: Pedidos) {

      this.pedidosService.guardarPedido(pedido)
        .subscribe(resp => {
          Swal.fire(
            'Estado de entrega modificado',
            `El estado del pedido de ${pedido.nombreCliente} ha sido modificado`,
            'success'
          )
            this.cargarPedidosPendientes();
            this.cargarPedidosRetirados();
            this.cargarPedidosNoRetirados();
            this.cargarPedidosPendientesEntrega();
            this.cargarPedidosEntregados();
            this.cargarPedidosNoEntregados();
        });
      }

      cambiarPagina(valor: number) {
      
        this.desde += valor; //Si va a ser de 5 usuarios por pág, el valor 0 + 5, 5+5, 10+5
    
        if(this.desde <= 0 ){
          this.desde = 0;
        } else if (this.desde >= this.totalPedidos) {
          this.desde -= valor; // Si tengo 10 usuarios y le sumo: 10 + 5, 'desde' suma 15 y es mayor a 'totalUsuarios', entonces se resta 5 de esta fun y queda en 10
        }
    
        this.cargarPedidos();
    
      }  
    
      deshabilitar1() {
       
        if(this.desde <= 0){
          return true;
        } else {
          return false;
        }
      }
    
      deshabilitar2() {
       let desde2 = this.desde + 10
        if(this.totalPedidos > desde2){
          return false;
        } else if (desde2 > this.totalPedidos) {
          return true;
        } else {
          return true;
        }
      }

}
