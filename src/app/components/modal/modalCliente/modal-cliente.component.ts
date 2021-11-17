import { Component, OnInit } from '@angular/core';
import { ModalClientesService } from '../../../services/modal-clientes.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';
import { Clientes } from 'src/app/models/clientes.model';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styles: [
  ]
})
export class ModalClienteComponent implements OnInit {

  public formEnviado = false;

  public clientes: Clientes[] = [];

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required],
    domicilio: ['', Validators.required],
    observaciones: ['', Validators.required]
  });

  constructor( public modalClientesService: ModalClientesService,
               private fb: FormBuilder,
               private clientesService: ClientesService) { }

  ngOnInit(): void {
  }

  crearCliente() {
      
    this.formEnviado = true;
    console.log(this.registerForm.value);

  if (this.registerForm.invalid) {
    return;
  }
  //Si el formulario de arriba es váilido, realizar el posteo
  this.clientesService.crearCliente(this.registerForm.value)
    .subscribe( resp => {
      Swal.fire({
        title: 'Nuevo Cliente',
        text: 'Cliente creado correctamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed){
          this.cerrarModal();
          this.refresh();
        }
      })
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
}

cerrarModal() {
  this.modalClientesService.cerrarModalClientes();
}

refresh(): void { window.location.reload(); }


campoNoValido(campo: string): boolean {
    
  if(this.registerForm.get(campo)?.invalid && this.formEnviado) {
    return true;
  } else {
    return false;
  }
}





}
