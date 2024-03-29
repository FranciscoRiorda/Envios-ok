import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formEnviado = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') ||'', [Validators.required, Validators.email]],
    password: ['', Validators.required], 
    recordar: [false || localStorage.getItem('email')]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  login(){

    this.usuarioService.login(this.loginForm.value)
        .subscribe(resp => {
          
          if(this.loginForm.get('recordar')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          }else {
            localStorage.removeItem('email');
          }

          //Navegar al dashboard una vez que iniciemos sesión. Anteriormente habrá pasado por todas las validaciones.
          this.router.navigateByUrl('/');

        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })
      
    //Para que se ejecute debo realizar el subscribe
    // console.log(this.loginForm.value)
    // this.router.navigateByUrl('/');
  }

}
