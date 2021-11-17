import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes.model';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  public cliente: Clientes[] = [];

  public clienteForm!: FormGroup;

  public clienteSeleccionado!: Clientes;


  constructor( private fb: FormBuilder,
               private clienteService: ClientesService,
               private activatedRoute: ActivatedRoute,
               private router: Router
               ) { }

  ngOnInit(): void {

    console.log(this.cliente)
    
    this.activatedRoute.params
      .subscribe(({id}) => this.cargarCliente(id));

      this.clienteForm = this.fb.group({
        nombre: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required],
        domicilio: ['', Validators.required],
        observaciones: [''],
        // usuario: ['']
      })

  }

  cargarCliente(id: string) {
    this.clienteService.obtenerClientePorId(id)
      .subscribe(cliente => {
        console.log(cliente);
        this.clienteSeleccionado = cliente;
        const {nombre, dni, telefono, email, domicilio, observaciones} = cliente;
        this.clienteForm.setValue({nombre, dni, telefono, email, domicilio, observaciones});
      })
  }

  actualizarCliente() {
    const {nombre} = this.clienteForm.value;

    if (this.clienteSeleccionado) {
      const data = {
        ...this.clienteForm.value,
        _id: this.clienteSeleccionado._id
      }
      this.clienteService.actualizarCliente(data)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Actualizado', `${nombre} modificado correctamente`, 'success');
        this.router.navigateByUrl('/dashboard/clientes');

    });
  }
}

}
