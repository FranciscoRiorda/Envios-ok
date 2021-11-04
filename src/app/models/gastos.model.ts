import { environment } from "src/environments/environment";

const base_url = environment.base_url;

// Interface para sacar info, de quien genero el gasto
interface _GastoUser {
    _id: string,
    nombre: string,
    apellido: string
    img: string
}


export class Gastos {

    constructor(
        
        public fecha: string,
        public descripcion: string,
        public importe: number,
        public _id?: string,
        public usuario?: _GastoUser
    ){}

    
}