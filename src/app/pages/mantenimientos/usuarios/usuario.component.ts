import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalPerfilService } from '../../../services/modal-perfil.service';
import { ModalImgService } from '../../../services/modal-img.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario[] = [];

  public usuarioForm!: FormGroup;

  public usuarioSeleccionado!: Usuario;

  public imgTemp!: any;

  public imagenSubir!: File;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fileUploadService: FileUploadService,
              ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .subscribe(({id}) => this.cargarUsuario(id));

      this.usuarioForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required],
        domicilio: ['', Validators.required],
        nacimiento: ['', Validators.required],
        
        
      })

  }

  cargarUsuario(uid: string) {
    this.usuarioService.obtenerUsuarioPorId(uid)
      .subscribe(usuario => {
        console.log(usuario);
        this.usuarioSeleccionado = usuario;
        const {nombre, apellido, dni, telefono, email, domicilio, nacimiento} = usuario;
        this.usuarioForm.setValue({nombre, apellido, dni, telefono, email, domicilio, nacimiento});
      })
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
      
      const id = this.usuarioService.id;
      const tipo = this.usuarioService.tipo;

      this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
          .then(img => this.usuarioService.usuario!.img = img);
    }



    refresh(): void { window.location.reload(); }


    actualizarUsuario(){

      const {nombre} = this.usuarioForm.value;
      const {apellido} = this.usuarioForm.value;

      
      if (this.usuarioSeleccionado) {
        const data = {
          ...this.usuarioForm.value,
          uid: this.usuarioSeleccionado.uid
        }

        this.usuarioService.actualizarUsuario(data)
        .subscribe(resp => {
          console.log(resp);

          Swal.fire('Actualizado', `${nombre} ${apellido} ha sido actualizado`, 'success');
          this.router.navigateByUrl('/dashboard/usuarios');
        });
      }
    }

}
