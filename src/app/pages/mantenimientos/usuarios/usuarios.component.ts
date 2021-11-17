import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalPerfilService } from '../../../services/modal-perfil.service';
import { ModalUsuarioService } from '../../../services/modal-usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: Number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImgService: ModalImgService,
              private modalPerfilService: ModalPerfilService,
              private modalUsuarioService: ModalUsuarioService) { }

  ngOnInit(): void {

    this.cargarUsuario2();
  }
  
  cargarUsuario2() {

    this.cargando = true;

    this.usuarioService.cargarUsuario(this.desde)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando = false;
      })
  }


  cambiarPagina(valor: number) {
      
    this.desde += valor; //Si va a ser de 5 usuarios por pág, el valor 0 + 5, 5+5, 10+5

    if(this.desde < 0 ){
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor; // Si tengo 10 usuarios y le sumo: 10 + 5, 'desde' suma 15 y es mayor a 'totalUsuarios', entonces se resta 5 de esta fun y queda en 10
    }

    this.cargarUsuario2();
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
    if(this.totalUsuarios > desde2){
      return false;
    } else if (desde2 > this.totalUsuarios) {
      return true;
    } else {
      return true;
    }
  }

  buscar (termino: string) {

    if (termino.length === 0 ) {
      return this.cargarUsuario2();
    }
    
    this.busquedasService.buscar('usuarios', termino)
    .subscribe(resp => {
      this.usuarios = resp as Usuario[];
        
      });
  }

  buscar2 (termino: string) {

    if (termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }
    
    this.busquedasService.buscar('usuarios', termino)
      .subscribe((resultados) => {

        this.usuarios = resultados as Usuario[];
        console.log(this.usuarios);  
        
        
      });
      return;
  }

  eliminarUsuario(usuario: Usuario) {    
    
    Swal.fire({
      title: 'Estás seguro que deseas borrar el usuario?',
      text: `Estás a punto de borrar a ${usuario.nombre} ${usuario.apellido}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario'
    }).then((result) => {
      if (result.value) {
        
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            
            this.cargarUsuario2();
            
            Swal.fire(
              'Eliminado!',
              `El usuario ${usuario.nombre} ${usuario.apellido} ha sido eliminado`,
            'success')
          });
      }
    });
    
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
    }
    return;
  }

  cambiarRole(usuario: Usuario) {

    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        Swal.fire(
          'Rol modificado',
          `El rol de ${usuario.nombre} ${usuario.apellido} ha sido modificado`,
          'success'
        )
      });

  }
  //Cambio de foto
  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImgService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
  //No se usa
  abrirModalPerfil(usuario: Usuario) {
    this.modalPerfilService.abrirModalPerfil('usuarios', usuario.uid!, usuario.img);
  }
  

  //Crear usuario
  abrirModalUsuario() {
    this.modalUsuarioService.abrirModalUsuario();
  }

  
}
 