interface _ClientesUser {
    _id: string,
    nombre: string,
    apellido: string
    img: string
}


export class Clientes {

    constructor(
        public nombre: string,
        public dni: string,
        public telefono: String,
        public email: string,
        public domicilio: string,
        public observaciones: string,
        public _id?: string,
        public usuario?: _ClientesUser
    ) {}
}


