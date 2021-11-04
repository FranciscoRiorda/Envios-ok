import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../../services/modal-img.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp!: any;


  constructor(public modalImgService: ModalImgService,
              public usuarioService: UsuarioService,        
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImgService.cerrarModal();    
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
      
      const id = this.modalImgService.id;
      const tipo = this.modalImgService.tipo;

      this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
          .then(img => this.usuarioService.usuario!.img = img);
          this.cerrarModal();
          
    }

    refresh(): void { window.location.reload(); }

}
