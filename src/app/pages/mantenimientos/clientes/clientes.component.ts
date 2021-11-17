import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Clientes } from 'src/app/models/clientes.model';
import Swal from 'sweetalert2';
import { ModalClientesService } from '../../../services/modal-clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  public totalClientes: Number = 0;
  public clientes: Clientes[] = [];
  public clientesTemp: Clientes[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private clientesService: ClientesService,
               private busquedasService: BusquedasService,
               private modalClientesService: ModalClientesService
               ) { }

  ngOnInit(): void {

    this.cargarClientes();
  }

  buscar (termino: string) {

    if (termino.length === 0 ) {
      return this.cargarClientes();
    }
    
    this.busquedasService.buscar('clientes', termino)
    .subscribe(resp => {
      this.clientes = resp as Clientes[];
        
      });
  }

  cargarClientes() {

    this.cargando = true;

    this.clientesService.cargarCliente(this.desde)
      .subscribe(({total, clientes}) => {
        this.totalClientes = total;
        this.clientes = clientes;
        this.clientesTemp = clientes;

        this.cargando = false;
        console.log(total)
      })
  }

  eliminarCliente(cliente: Clientes) {    
    
    Swal.fire({
      title: 'Estás seguro que deseas borrar el cliente?',
      text: `Estás a punto de borrar a ${cliente.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar cliente'
    }).then((result) => {
      if (result.value) {
        
        this.clientesService.eliminarCliente(cliente)
          .subscribe(resp => {
            
            this.cargarClientes();
            
            Swal.fire(
              'Eliminado!',
              `El usuario ${cliente.nombre} ha sido eliminado`,
            'success')
          });
      }
    });
  }

  deshabilitar1() {
   
    if(this.desde <= 0){
      return true;
    } else {
      return false;
    }
  }

  deshabilitar2() {
   let desde2 = this.desde + 50
    if(this.totalClientes > desde2){
      return false;
    } else if (desde2 > this.totalClientes) {
      return true;
    } else {
      return true;
    }
  }

  cambiarPagina(valor: number) {
      
    this.desde += valor; //Si va a ser de 5 usuarios por pág, el valor 0 + 5, 5+5, 10+5

    if(this.desde < 0 ){
      this.desde = 0;
    } else if (this.desde >= this.totalClientes) {
      this.desde -= valor; // Si tengo 10 usuarios y le sumo: 10 + 5, 'desde' suma 15 y es mayor a 'totalUsuarios', entonces se resta 5 de esta fun y queda en 10
    }

    this.cargarClientes();
  }

  abrirModalCliente() {
    this.modalClientesService.abrirModalClientes();
  }

}
