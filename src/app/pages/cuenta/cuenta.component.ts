import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: [
  ]
})
export class CuentaComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario | undefined;
  public imagenSubir!: File;
  public imgTemp!: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
              this.usuario = this.usuarioService.usuario;
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
      // password: ['', Validators.required],
      // password2: ['', Validators.required],
    })
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

  refresh(): void { window.location.reload(); }


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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuarioService.uid)
        .then(img => this.usuarioService.usuario!.img = img);
  }

}