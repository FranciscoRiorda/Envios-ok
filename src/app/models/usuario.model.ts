import { environment } from '../../environments/environment';

const base_url = environment.base_url;

environment


export class Usuario {

    constructor(
        public nombre: string,
        public apellido: string,
        public dni: string,
        public telefono: String,
        public email: string,
        public domicilio: string,
        public nacimiento: string,
        public password?: string,
        public img?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) {}

    get imagenUrl(){
        // /uploads/usuarios/no-image

        if(!this.img) {
            return `${base_url}/uploads/usuarios/no-image`;
        }else if (this.img) {
            return `${base_url}/uploads/usuarios/${this.img}`;
        } else
        return `${base_url}/uploads/usuarios/no-image`;
    }

}


