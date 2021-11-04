import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pedidos } from 'src/app/models/pedidos.model';
import Swal from 'sweetalert2';
import { PedidosService } from '../../services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Clientes } from '../../models/clientes.model';
import { CargarClientes } from '../../interfaces/cargarClientes.interface';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [
  ]
})
export class PedidoComponent implements OnInit {

  public pedidos: Pedidos[] = [];

  public clientes: Clientes[] = [];

  public pedidoForm!: FormGroup;

  public pedidoSeleccionado!: Pedidos;

  public clienteSeleccionado: Clientes | undefined;

  clientes2!: CargarClientes[];


  constructor( private fb: FormBuilder,
               private pedidosService: PedidosService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private clientesService: ClientesService,
               ) { }

  ngOnInit(): void {

    // this.clientesService.getAllClientes().subscribe(data => {
    //   console.log(data);
    // })

    this.cargarClientes();

    
    this.activatedRoute.params
    .subscribe(({id}) => this.cargarPedido(id));
    
    
        
    this.pedidoForm = this.fb.group({
      
      nombreCliente: ['', Validators.required],
      mailCliente: ['', Validators.required],
      diaRetiro: ['', Validators.required],
      domicilioRetiro: ['', Validators.required],
      telEntregaPaq: ['', Validators.required],
      estadoRetiro: ['', Validators.required],
      diaEntrega: ['', Validators.required],
      domicilioEntrega: ['', Validators.required],
      telRecibePaq: ['', Validators.required],
      estadoEntrega: ['', Validators.required],
      costoEnvio: ['', Validators.required],
      observaciones: [''],
    });
    
    this.pedidoForm.get('nombreCliente')?.valueChanges
        .subscribe(clienteId => {
          // console.log(clienteId);
          this.clienteSeleccionado = this.clientes.find( c => c._id === clienteId );
        });
    
  }

  cargarPedido(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.pedidosService.obtenerPedidoPorId(id)
      .subscribe(pedido => {

        if(!pedido ){
          this.router.navigateByUrl(`/dashboard/pedidos`);
        }

        this.pedidoSeleccionado = pedido;
        const { nombreCliente, mailCliente, diaRetiro, domicilioRetiro, telEntregaPaq, estadoRetiro, diaEntrega, domicilioEntrega, telRecibePaq, estadoEntrega, costoEnvio, observaciones} = pedido;
        this.pedidoForm.setValue({ nombreCliente, mailCliente, diaRetiro, domicilioRetiro, telEntregaPaq, estadoRetiro, diaEntrega, domicilioEntrega, telRecibePaq, estadoEntrega, costoEnvio, observaciones});

      })

  }


  guardarPedido() {

    const {nombreCliente} = this.pedidoForm.value;

    if (this.pedidoSeleccionado) {
      //Actualizar
      const data = {
        ...this.pedidoForm.value,
        _id: this.pedidoSeleccionado._id
      }
      this.pedidosService.actualizarPedidos(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `Pedido de ${nombreCliente} actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pedidos`);
        })

    } else {
      //Crear
      this.pedidosService.crearPedido(this.pedidoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `Pedido de ${nombreCliente} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pedidos`);
        });
    }
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

      this.pedidosService.guardarPedido(pedido)
        .subscribe(resp => {
          Swal.fire(
            'Estado de entrega modificado',
            `El estado del pedido de ${pedido.nombreCliente} ha sido modificado`,
            'success'
          )
        });
      }

      cargarClientes() {

        this.clientesService.getClientes()
          .subscribe( data => {
            this.clientes = data;
            console.log(data);
          })
          
    
      }
      
}
