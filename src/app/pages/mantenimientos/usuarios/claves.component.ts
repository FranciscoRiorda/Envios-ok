import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claves',
  templateUrl: './claves.component.html',
  styles: [
  ]
})
export class ClavesComponent implements OnInit {

  public formEnviado = false;

  public usuario: Usuario[] = [];

  public usuarioForm!: FormGroup;

  public usuarioSeleccionado!: Usuario;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({id}) => this.cargarUsuario(id));

      this.usuarioForm = this.fb.group({
        password: [''], 
        
      })
      
  }

  cargarUsuario(uid: string) {
    this.usuarioService.obtenerUsuarioPorId(uid)
      .subscribe(usuario => {
        console.log(usuario);
        this.usuarioSeleccionado = usuario;
        const {password} = usuario;
        this.usuarioForm.setValue({password});
      })
  }

  actualizarUsuario(){

    if (this.usuarioSeleccionado) {
      const data = {
        ...this.usuarioForm.value,
        uid: this.usuarioSeleccionado.uid
      }

      this.usuarioService.actualizarClave(data)
      .subscribe(resp => {
        console.log(resp);

        Swal.fire('Actualizado', `La congraseña ha sido actualizado`, 'success');
        this.router.navigateByUrl('/dashboard/usuarios');
      });
    }
  }

 


  

}
