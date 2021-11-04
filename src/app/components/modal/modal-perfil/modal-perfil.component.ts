import { Component, OnInit } from '@angular/core';
import { ModalPerfilService } from '../../../services/modal-perfil.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../../services/file-upload.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styles: [
  ]
})
export class ModalPerfilComponent implements OnInit {

  public usuarioSeleccionado!: Usuario;

  public formEnviado = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    domicilio: ['', Validators.required],
    nacimiento: ['', Validators.required],
    
    
  }, {
    // Validators: this.passwordsIguales('password', 'password2')
  });

  public imagenSubir!: File;
  public imgTemp!: any;

  public perfilForm!: FormGroup;
  public usuario: Usuario | undefined;

  constructor(public modalPerfilService: ModalPerfilService,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    // .subscribe(({uid}) => this.cargarUsuario(uid));
  }

  cargarUsuario(uid: string) {
    this.usuarioService.obtenerUsuarioPorId(uid)
      .subscribe(usuario => {
        console.log(usuario);
        this.usuarioSeleccionado = usuario;
        const {nombre, apellido, dni, telefono, email, domicilio, nacimiento, role} = usuario;
        this.registerForm.setValue({nombre, apellido, dni, telefono, email, domicilio, nacimiento, role});

      })

  }

  refresh(): void { window.location.reload(); }

  cerrarModal() {
    this.imgTemp = null;
    this.modalPerfilService.cerrarModalPerfil();    
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, apellido, dni, telefono, email, domicilio, nacimiento} = this.perfilForm.value;
        this.usuarioService.usuario!.nombre = nombre;
        this.usuarioService.usuario!.apellido = apellido;
        this.usuarioService.usuario!.dni = dni;
        this.usuarioService.usuario!.telefono = telefono;
        this.usuarioService.usuario!.email = email;
        this.usuarioService.usuario!.domicilio = domicilio;
        this.usuarioService.usuario!.nacimiento = nacimiento;

        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(event: any) {    
    // console.log(event.target.files[0]);
  
    this.imagenSubir = event.target.files[0];
  
    //Actualizar la imagen en miniatura, pero no cambiarla hasta que se presione el botón de guardar
  
    if(!event.target.files[0]) {
      return;
    }
    
    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result!.toString();
    }
    }

    subirImagen(){
      
      const id = this.modalPerfilService.id;
      const tipo = this.modalPerfilService.tipo;

      this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
          .then(img => this.usuarioService.usuario!.img = img);
          this.cerrarModal();
          
    }
    

}
