import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalUsuarioService } from '../../../services/modal-usuario.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styles: [
  ]
})
export class ModalUsuarioComponent implements OnInit {

  public formEnviado = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    domicilio: ['', Validators.required],
    nacimiento: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: ['', Validators.required],
    
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              public modalUsuarioService: ModalUsuarioService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  refresh(): void { window.location.reload(); }

  campoNoValido(campo: string): boolean {
    
    if(this.registerForm.get(campo)?.invalid && this.formEnviado) {
      return true;
    } else {
      return false;
    }
  }

  crearUsuario() {
      
    this.formEnviado = true;
    console.log(this.registerForm.value);

  if (this.registerForm.invalid) {
    return;
  }
  //Si el formulario de arriba es váilido, realizar el posteo
  this.usuarioService.crearUsuario2(this.registerForm.value)
    .subscribe( resp => {
      Swal.fire('Nuevo usuario', 'Usuario creado correctamente', 'success' )
      
      this.cerrarModal();
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    this.refresh();
}

passwordDif() {
    
  const pass1 = this.registerForm.get('password')?.value;
  const pass2 = this.registerForm.get('password2')?.value;
  
  if((pass1 !== pass2)) {
    return true;
  } else {
    return false;
  }
  
}

cerrarModal() {
  this.modalUsuarioService.cerrarModalUsuario();    
}

aceptaTerminos() {
  return !this.registerForm.get('terminos')?.value && this.formEnviado;
}


}
