import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  
  public formEnviado = false;

  public registerForm = this.fb.group({
    nombre: ['Francisco ', Validators.required],
    apellido: ['Riorda', Validators.required],
    dni: ['3333333', Validators.required],
    telefono: ['3534795305', Validators.required],
    email: ['nati@gmail.com', [Validators.required, Validators.email]],
    domicilio: ['santa fe 425', Validators.required],
    nacimiento: ['02/01/1994', Validators.required],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [false, Validators.required]
    
    
  }, {
    // Validators: this.passwordsIguales('password', 'password2')
  });
  
  constructor(  private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private router: Router) { }
    
    
    
    
    //Método para capturar la información
    crearUsuario() {
      
      this.formEnviado = true;
      console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }
    //Si el formulario de arriba es váilido, realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
        
        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    
    if(this.registerForm.get(campo)?.invalid && this.formEnviado) {
      return true;
    } else {
      return false;
    }
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
  
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formEnviado;
  }


  // passwordsIguales(pass1Name: string, pass2Name: string) {

  //   return (formGroup: FormGroup) => {

  //     const pass1Control = formGroup.get(pass1Name);
  //     const pass2Control = formGroup.get(pass2Name);

  //     if ( pass1Control?.value === pass2Control?.value) {
  //       pass2Control?.setErrors(null);
  //     } else {
  //       pass2Control?.setErrors({noEsIgual: true})
  //     }

  //   }

  // }
  
  
}
