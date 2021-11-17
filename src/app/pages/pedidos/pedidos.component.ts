import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/models/pedidos.model';
import { PedidosService } from '../../services/pedidos.service';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Clientes } from '../../models/clientes.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: [
  ]
})
export class PedidosComponent implements OnInit {

  public cargando: boolean = true;

  public pedidos: Pedidos[] = [];
  public clientes: Clientes[] = [];
  public pedidosTemp: Pedidos[] = [];

  public totalPedidos: number = 0;
  public desde: number = 0;

  constructor( private pedidosService: PedidosService,
               private busquedasService: BusquedasService,
               ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  totalIngreso():any{
    
    let total=0;
    this.pedidos.forEach(t => {
      total += t.costoEnvio;
      // console.log(total)
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
        
        console.log(this.totalPedidos);
        console.log(pedidos);

      })
  }

  buscar (termino: string) {

    if (termino.length === 0 ) {
      return this.cargarPedidos();
    }
    
    this.busquedasService.buscar('pedidos', termino)
    .subscribe(resp => {
      this.pedidos = resp as Pedidos[];
        
      });
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
            this.cargarPedidos();
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
      });
    }

    cambiarEstadoEntrega(pedido: Pedidos) {

      if(pedido.estadoEntrega === 'No Entregado') {
        pedido.costoEnvio = 0;
        pedido.estadoRetiro = 'No Retirado';

        this.pedidosService.guardarPedido(pedido)
          .subscribe(resp => {
            Swal.fire(
              'Estado de entrega modificado',
              `El estado del pedido de ${pedido.nombreCliente} ha sido modificado`,
              'success'
            )
          });
      } else {
        this.pedidosService.guardarPedido(pedido)
          .subscribe(resp => {
            Swal.fire(
              'Estado de entrega modificado',
              `El estado del pedido de ${pedido.nombreCliente} ha sido modificado`,
              'success'
            )
          });
      }

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
   let desde2 = this.desde + 15
    if(this.totalPedidos > desde2){
      return false;
    } else if (desde2 > this.totalPedidos) {
      return true;
    } else {
      return true;
    }
  }

}
