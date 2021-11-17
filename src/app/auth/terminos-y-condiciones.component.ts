import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-terminos-y-condiciones',
  templateUrl: './terminos-y-condiciones.component.html',
  styles: [
  ]
})
export class TerminosYCondicionesComponent implements OnInit {

  public formEnviado = false;

  public usuario: Usuario | undefined;

  public perfilForm!: FormGroup;  

  public usuarioSeleccionado!: Usuario;

  public terminosForm = this.fb.group({
    
    terminos: [ sessionStorage.getItem('terminos') || false, Validators.required ],
    
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute,
              ) {
                this.usuario = this.usuarioService.usuario
               }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({

      nombre: [this.usuarioService.usuario?.nombre, Validators.required],
      apellido: [this.usuarioService.usuario?.apellido, Validators.required],
      dni: [this.usuarioService.usuario?.dni, Validators.required],
      telefono: [this.usuarioService.usuario?.telefono, Validators.required],
      email: [this.usuarioService.usuario?.email, [Validators.required, Validators.email]],
      domicilio: [this.usuarioService.usuario?.domicilio, Validators.required],
      nacimiento: [this.usuarioService.usuario?.nacimiento, Validators.required],
      
      terminos: ['', Validators.required],
    })

    console.log('terminos',this.usuario?.terminos)
    console.log('usuarioservice',this.usuarioService.usuario?.terminos)
    console.log('usuarioservice2',this.usuarioService.terminos)
    
    this.navegacion();
  }
  
  navegacion() {
    if(this.usuario?.terminos == 'true') {
      this.router.navigateByUrl('/');
      return;
    }else {
      // this.router.navigateByUrl('/dashboard/terminosYcondiciones');
      return;
    }
  }


  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, apellido, dni, telefono, email, domicilio, nacimiento, terminos } = this.perfilForm.value;
        this.usuarioService.usuario!.nombre = nombre;
        this.usuarioService.usuario!.apellido = apellido;
        this.usuarioService.usuario!.dni = dni;
        this.usuarioService.usuario!.telefono = telefono;
        this.usuarioService.usuario!.email = email;
        this.usuarioService.usuario!.domicilio = domicilio;
        this.usuarioService.usuario!.nacimiento = nacimiento;
        this.usuarioService.usuario!.terminos = terminos;
      })
      this.router.navigateByUrl('/dashboard');
  }

  

  //*NgIf
  aceptaTerminos() {
    return !this.perfilForm.get('terminos')?.value && this.formEnviado;
  }


  cancelar() {
    this.router.navigateByUrl('/login');
  }

}
