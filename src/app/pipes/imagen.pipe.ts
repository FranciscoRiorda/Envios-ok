import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'): string {

      if(!img) {
          return `${base_url}/uploads/usuarios/no-image`;
      }else if (img) {
          return `${base_url}/uploads/usuarios/${img}`;
      } else
      return `${base_url}/uploads/usuarios/no-image`;
  }

}
